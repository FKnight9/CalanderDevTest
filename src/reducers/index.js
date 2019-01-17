import { combineReducers } from 'redux'
import calendarReducer from './calendarReducer'

const allReducers = combineReducers({
  calendar: calendarReducer
})

export default allReducers