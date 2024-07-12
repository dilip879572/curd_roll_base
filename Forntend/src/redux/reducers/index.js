import { combineReducers } from 'redux'
import customerReducer from './customerSlice'
import contactReducer from './contactSlice'

const rootReducer = combineReducers({
  customers: customerReducer,
  contacts: contactReducer,
})

export default rootReducer
