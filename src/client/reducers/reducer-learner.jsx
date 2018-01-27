import { FETCH_LEARNERS,
  SET_ALUMNI,
  SET_CURRENT_LEARNERS,
  DONE_LOADING,
} from '../actions/';

export default function(state = { loading: true }, action) {
  switch (action.type) {
    case FETCH_LEARNERS:
      return {
        allLearners: action.payload,
        loading: action.loading,
      };
    case SET_ALUMNI:
      return {
        allLearners: state.allLearners,
        alumni: action.payload,
        loading: action.loading,
      };
    case SET_CURRENT_LEARNERS:
      return {
        allLearners: state.allLearners,
        alumni: state.alumni,
        currentLearners: action.payload,
        loading: action.loading,
      };
    case DONE_LOADING:
      return {
        allLearners: state.allLearners,
        alumni: state.alumni,
        currentLearners: state.currentLearners,
        loading: action.loading,
      };
  }
  return state;
}
