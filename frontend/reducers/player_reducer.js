import { PLAY_SONG } from '../actions/player_actions';
import merge from "lodash/merge";

const defaultState = {
  url: null,
  playing: false,
  volume: 0.8,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  loop: false
};

const playerReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case PLAY_SONG:
      return merge({}, state, {url: action.audio, playing: true});
    default:
      return state;
  }
};

export default playerReducer;
