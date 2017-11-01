import { combineReducers } from 'redux'
import LearnerReducer from './reducer-learner' 

const rootReducer = combineReducers({
  learner : LearnerReducer
})

export default rootReducer