import { 
  RECEIVE_SONG_ERRORS,
  CLEAR_SONG_ERRORS
} from "../actions/song_actions";

const songsErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG_ERRORS:
      return action.errors;
    case CLEAR_SONG_ERRORS:
      return {};
    default:
      return state;
  }
};

export default songsErrorsReducer;