import { combineReducers } from 'redux'
import LearnerReducer from './reducer-learner'

const rootReducer = combineReducers({
  guild: LearnerReducer,
});

export default rootReducer;
