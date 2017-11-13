import { combineReducers } from 'redux'
import LearnerReducer from './reducer-learner'

const rootReducer = combineReducers({
  learners: LearnerReducer,
});

export default rootReducer;
