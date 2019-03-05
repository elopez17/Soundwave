import * as APIUtil from "../util/song_api_util";

export const RECEIVE_SONG = "RECEIVE_SONG";
export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_SONG_ERRORS = "RECEIVE_SONG_ERRORS";
export const CLEAR_SONG_ERRORS = "CLEAR_SONG_ERRORS";

export const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
});

export const receiveSongs = songs => ({
  type: RECEIVE_SONGS,
  songs
});

export const receiveSongErrors = errors => ({
  type: RECEIVE_SONG_ERRORS,
  errors
});

export const clearSongErrors = () => ({
  type: CLEAR_SONG_ERRORS,
});

export const fetchSong = songId => dispatch => (
  APIUtil.fetchSong(songId).then(song => dispatch(receiveSong(song)))
);

export const fetchSongs = () => dispatch => (
  APIUtil.fetchSongs().then(songs => dispatch(receiveSongs(songs)))
);

export const fetchSongsByUser = (userId) => dispatch => (
  APIUtil.fetchSongsByUser(userId).then(songs => dispatch(receiveSongs(songs)))
);
