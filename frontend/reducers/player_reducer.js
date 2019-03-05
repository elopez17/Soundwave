import {
  PLAY_SONG,
  PAUSE_SONG,
  END_SONG,
  DURATION,
  PROGRESS
} from '../actions/player_actions';
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
    case PAUSE_SONG:
      return merge({}, state, {playing: false});
    case DURATION:
      return merge({}, state, {duration: action.duration});
    case PROGRESS:
      return merge({}, state, {played: action.played});
    case END_SONG:
      return merge({}, state, {
        url: null, playing: false,
        played: 0, duration: 0
      });
    default:
      return state;
  }
};

export default playerReducer;
