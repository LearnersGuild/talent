import { combineReducers } from 'redux'
import LearnerReducer from './reducer-learnerHelper.js'

const rootReducer = combineReducers({
  guild: LearnerReducer,
});

export default rootReducer;
