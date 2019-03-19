import { createSelector } from 'reselect';

const getSongs = (state) => state.entities.songs;

export const getSongsArr = createSelector(
  [getSongs],
  (songs) => {
    return Object.values(songs);
  }
);
