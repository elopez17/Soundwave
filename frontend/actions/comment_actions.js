import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

export const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment
});

export const fetchCommentsFromSong = (songId) => (dispatch) => (
  APIUtil.fetchCommentsFromSong(songId).then(comments => dispatch(receiveComments(comments)))
);

export const postComment = (comment) => (dispatch) => (
  APIUtil.postComment(comment).then(comment => dispatch(receiveComment(comment)))
);