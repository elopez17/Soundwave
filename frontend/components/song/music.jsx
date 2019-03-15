import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {
  playSong,
  pauseSong
} from '../../actions/player_actions';

const mapStateToProps = state => ({
  songs: Object.values(state.entities.songs).sort((a, b) => a.name.localeCompare(b.name)),
  player: state.ui.player,
});

const mapDispatchToProps = dispatch => ({
  playSong: (audio, id) => dispatch(playSong(audio, id)),
  pauseSong: () => dispatch(pauseSong())
});


class MusicContainer extends React.Component {
  constructor(props){
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleRedirect(userId){
    return (e) => {
      e.stopPropagation();
      this.props.history.push(`/users/${userId}`);
    };
  }

  handleHover(isHover, id, url) {
    return () => {
      if (isHover === true &&
        (this.props.player.playing === false ||
          this.props.player.url !== url)) {
        this.refs["playIcon" + id].style.display = "inline-block";
        this.refs["pauseIcon" + id].style.display = "none";
      } else {
        this.refs["playIcon" + id].style.display = "none";
      }
    };
  }

  handleClick(id, url) {
    return (e) => {
      e.stopPropagation();
      this.props.songs.map(song => this.refs["pauseIcon" + song.id].style.display = "none");
      this.props.playSong(url, id);
      this.refs["playIcon" + id].style.display = "none";
      this.refs["pauseIcon" + id].style.display = "inline-block";
    };
  }

  render(){
    return (
      <div className="music_grid">
      {
        this.props.songs.map(song => (
          <div onClick={this.handleRedirect(song.user_id)} key={song.id}
              onMouseEnter={this.handleHover(true, song.id, song.audio)}
              onMouseLeave={this.handleHover(false, song.id, song.audio)}>
            <img src={song.photoURL}/>
            <div>{song.name}</div>
            <span className="play__icon music_play_pause" style={{ display: "none" }} ref={"playIcon" + song.id}
              onClick={this.handleClick(song.id, song.audio)} />
            <span className="pause_icon music_play_pause" style={{ display: "none" }} ref={"pauseIcon" + song.id}
              onClick={(e) => {
                e.stopPropagation();
                this.props.pauseSong();
                this.refs["pauseIcon" + song.id].style.display = "none";
                this.refs["playIcon" + song.id].style.display = "inline-block";
              }} />
          </div>
        ))
      }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicContainer));