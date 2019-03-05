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

export const fetchSongsByUser = (userId) => {
  return $.ajax({
    url: `/api/songs/user/${userId}`,
    method: "GET"
  });
};

export const postSong = (songURL) => {
  return $.ajax({
    url: `/api/songs/cloudinary`,
    method: "POST",
    data: { song_url: songURL }
  });
};

export const getWaveform = (songName) => {
  return $.ajax({
    url: `/api/songs/waveform/${songName}`,
    method: "GET"
  });
};