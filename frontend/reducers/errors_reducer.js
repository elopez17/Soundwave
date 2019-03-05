import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import songsErrorsReducer from './songs_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  songs: songsErrorsReducer,
});
