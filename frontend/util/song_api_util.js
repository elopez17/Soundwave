export const fetchSong = (songId) => {
  return $.ajax({
    url: `/api/songs/${songId}`,
    method: "GET"
  });
};

export const fetchSongs = () => {
  return $.ajax({
    url: `/api/songs`,
    method: "GET"
  });
};