import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import playerReducer from './player_reducer';

export default combineReducers({
  modal: modalReducer,
  player: playerReducer,
});
