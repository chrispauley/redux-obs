export const LOAD_STORIES = 'LOAD_STORIES';
export const CLEAR_STORIES = 'CLEAR_STORIES';
export const FETCH_STORIES = 'FETCH_USER';
export const FETCH_STORIES_FULFILLED = 'FETCH_STORIES_FULFILLED';


export function loadStories() {
    return {type: LOAD_STORIES}
}

export function clear() {
    return {type: CLEAR_STORIES}
}

export function fetchStories(count = 5) {
    return {
        type: FETCH_STORIES,
        payload: count
    }
}

export function fetchStoriesFulfilledAction(stories) {
    return {
        type: FETCH_STORIES_FULFILLED,
        payload: stories
    }
}
