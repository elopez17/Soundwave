import * as APIUtil from "../util/song_api_util";

export const RECEIVE_SONG = "RECEIVE_SONG";

export const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
});

export const fetchSong = songId => dispatch => (
  APIUtil.fetchSong(songId).then(song => dispatch(receiveSong(song)))
);
