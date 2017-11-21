import { combineReducers } from 'redux'

import storiesReducer from './storiesReducer'
import userReducer from './userReducer'
import beersReducer from './beersReducer'

export default combineReducers({
    storiesReducer, userReducer, beersReducer
})
