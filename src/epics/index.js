import {Observable} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {clear, LOAD_STORIES, FETCH_STORIES, fetchStoriesFulfilledAction} from '../actions/storyActions'
import {FETCH_USER, fetchUserFulfilledAction} from '../actions/userActions'
import {receiveBeers, SEARCHED_BEERS,
    searchBeersError,
    searchBeersLoading, CANCEL_SEARCH } from "../actions/beersActions";

const topStories = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
const url = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

function fetchStoriesEpic(action$, store, deps) {
    return action$.ofType(FETCH_STORIES)
    .switchMap(({payload}) => {
        return Observable.ajax.getJSON(topStories)
        // .do(x =>console.log(x))
        // .ignoreElements()
        // slice first 5 ids
        .map(ids => ids.slice(0,5))
        // convert ids into urls
        .map(ids => ids.map(url))
        // convert urls -> ajax
        .map(urls => urls.map(url => Observable.ajax.getJSON(url)))
        // execute 5 ajax requests
        .mergeMap(reqs => Observable.forkJoin(reqs))
        // results -> store
        .map(stories => fetchStoriesFulfilledAction(stories))
    })
}

function loadStoriesEpic(action$, store, deps) {
    return action$.ofType(LOAD_STORIES).switchMap(() => {
        return Observable.of(clear()).delay(2000);
    })
}


export function fetchUserEpic(action$, store, deps) {
    return action$.ofType(FETCH_USER)
    .switchMap(({payload}) => {
        return Observable.ajax.getJSON(`https://api.github.com/users/${payload}`)
        .map(user => {
            return fetchUserFulfilledAction(user);
        })
    })
}



const beers  = `https://api.punkapi.com/v2/beers`;
const search = (term) => `${beers}?beer_name=${encodeURIComponent(term)}`;
// const ajax   = (term) =>
//     term === 'skull'
//     ? Observable.throw(new Error('Ajax failed!!'))
//     : Observable.ajax.getJSON(search(term)).delay(5000);

export function searchBeersEpic(action$, store, deps) {
  return action$.ofType(SEARCHED_BEERS)
    .debounceTime(500)
    .filter(action => action.payload !== '')
    .switchMap(({payload}) => {
        // loading state for the UI
        const loading = Observable.of(searchBeersLoading(true));

        const blockers = Observable.merge(
            action$.ofType(CANCEL_SEARCH)
        )
        // External API call
        const request = deps.ajax.getJSON(search(payload))
        .takeUntil(blockers)
        .map(receiveBeers)
        .catch(err => {
            return Observable.of(searchBeersError(err))
        });

        return Observable.concat(
            loading, request
        );
    })
}



export const rootEpic = combineEpics(
    fetchStoriesEpic, 
    loadStoriesEpic,
    fetchUserEpic,
    searchBeersEpic);
