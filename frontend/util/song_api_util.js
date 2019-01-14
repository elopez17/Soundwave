export const fetchSong = (songId) => {
  return $.ajax({
    url: `/api/songs/${songId}`,
    method: "GET"
  });
};