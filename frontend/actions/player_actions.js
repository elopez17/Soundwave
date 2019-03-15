export const PLAY_SONG = "PLAY_SONG";
export const PAUSE_SONG = "PAUSE_SONG";
export const DURATION = "DURATION";
export const PROGRESS = "PROGRESS";
export const END_SONG = "END_SONG";

export const playSong = (audio, id) => ({
  type: PLAY_SONG,
  id,
  audio
});

export const pauseSong = () => ({
  type: PAUSE_SONG,
});

export const setDuration = (duration) => ({
  type: DURATION,
  duration,
});

export const setProgress = (progress) => ({
  type: PROGRESS,
  played: progress.played,
});

export const endSong = () => ({
  type: END_SONG,
});

