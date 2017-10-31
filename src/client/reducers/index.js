import { combineReducers } from 'redux';
import LearnersReducer from './reducer_learners';

const rootReducer = combine({
  learner: LearnersReducer
});

export default rootReducer;