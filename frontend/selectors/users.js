import { createSelector } from 'reselect';

const getUsers = (state) => state.entities.users;

export const getUsersArr = createSelector(
  [ getUsers ],
  (users) => {
    return Object.values(users);
  }
);
