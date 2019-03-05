export const fetchCommentsFromSong = (songId) => {
  return $.ajax({
    url: `/api/comments/song/${songId}`,
    method: "GET"
  });
};

export const postComment = (comment) => {
  return $.ajax({
    url: `/api/comments`,
    method: "POST",
    data: { comment }
  });
};