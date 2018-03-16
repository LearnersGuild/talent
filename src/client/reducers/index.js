import { combineReducers } from 'redux';
import LearnerReducer from './reducerLearner';

const rootReducer = combineReducers({
  guild: LearnerReducer,
});

export default rootReducer;
