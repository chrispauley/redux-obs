import {Observable} from 'rxjs'
import {VirtualTimeScheduler} from 'rxjs/scheduler/VirtualTimeScheduler';
import {ActionsObservable} from 'redux-observable'
import {searchBeersEpic} from './index.js'
import {searchBeers,
    SEARCHED_BEERS_LOADING,
    RECEIVED_BEERS} from '../actions/beersActions'

import {configureStore} from '../configureStore'

it('should return correct actions', function () {
  const action$ = ActionsObservable.of(searchBeers('chris'));

  const deps = {
      ajax: {
          getJSON: () => Observable.of([{name: 'chris'}])
      }
  }

  const output$ = searchBeersEpic(action$, null, deps);

  output$.toArray().subscribe(actions => {
      expect(actions.length).toBe(2);
      // console.log(actions);
      expect(actions[0].type).toBe(SEARCHED_BEERS_LOADING);
      expect(actions[1].type).toBe(RECEIVED_BEERS);
  })
});

it('should perform a searchBeers (redux)', function() {
    const scheduler = new VirtualTimeScheduler();

    const deps = {
        scheduler,
        ajax: {
            getJSON: () => Observable.of([{name: 'chris'}])
        }
    }
    const store = configureStore(deps);

    const action = searchBeers('chris');
// console.log('bf',store.getState());
    store.dispatch(action);
    scheduler.flush();
// console.log('after',store.getState());
    expect(store.getState().beersReducer.beers.length).toBe(1);
});
