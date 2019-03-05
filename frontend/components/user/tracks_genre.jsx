import React from 'react';

const TracksGenre = ({songs}) => {
  return (
  <div className="user-show-sidebar">
  {
        songs.map(song => (
          <div className="user_sidebar_genre text" id="talkbubble" key={song.id}>{song.genre}</div>
        ))
  }
  </div>);
};

export default TracksGenre;