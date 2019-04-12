import {
  PLAY_SONG,
  PAUSE_SONG,
  END_SONG,
  DURATION,
  PROGRESS,
  VOLUME,
  LOOP_SONG,
  MUTE_SONG
} from '../actions/player_actions';
import merge from "lodash/merge";

const defaultState = {
  id: null,
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
      return merge({}, state, {url: action.audio, id: parseInt(action.id, 10), playing: true});
    case PAUSE_SONG:
      return merge({}, state, {playing: false});
    case DURATION:
      return merge({}, state, {duration: action.duration});
    case PROGRESS:
      return merge({}, state, {played: action.played});
    case VOLUME:
      return merge({}, state, {volume: action.volume});
    case END_SONG:
      return merge({}, state, {
        url: null, playing: false,
        played: 0, duration: 0
      });
    case LOOP_SONG:
      return merge({}, state, {loop: (state.loop ? false : true)});
    case MUTE_SONG:
      return merge({}, state, {muted: action.muted});
    default:
      return state;
  }
};

export default playerReducer;
