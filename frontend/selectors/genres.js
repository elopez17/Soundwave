import { createSelector } from 'reselect';

const getSongs = (state) => state.entities.songs;

export const getGenres = createSelector(
  [ getSongs ],
  (songs) => {
    let obj = {
      blues: [], electronic: [], hipHop: [],
      jazz: [], loFi: [], piano: [], pop: [],
      rap: [], rock: [], rB: []
    };
    let arrSongs = Object.values(songs);

    obj.blues = arrSongs.filter(song => song.genre === "blues");
    obj.electronic = arrSongs.filter(song => song.genre === "electronic");
    obj.hipHop = arrSongs.filter(song => song.genre === "hip-hop");
    obj.jazz = arrSongs.filter(song => song.genre === "jazz");
    obj.loFi = arrSongs.filter(song => song.genre === "lo-fi");
    obj.piano = arrSongs.filter(song => song.genre === "piano");
    obj.pop = arrSongs.filter(song => song.genre === "pop");
    obj.rap = arrSongs.filter(song => song.genre === "rap");
    obj.rock = arrSongs.filter(song => song.genre === "rock");
    obj.rB = arrSongs.filter(song => song.genre === "r&b");
    return obj;
  }
);
