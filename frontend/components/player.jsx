import React from 'react';
import ReactPlayer from "react-player";
import { connect } from 'react-redux';
import { 
  setDuration,
  setProgress,
  setVolume,
  endSong,
  playSong,
  pauseSong,
  loopSongToggle,
  muteSong
} from '../actions/player_actions';

const mapStateToProps = (state) => ({
  player: state.ui.player,
  songs: state.entities.songs,
  users: state.entities.users,
});

const mapDispatchToProps = dispatch => ({
  setDuration: duration => dispatch(setDuration(duration)),
  setProgress: progress => dispatch(setProgress(progress)),
  setVolume: volume => dispatch(setVolume(volume)),
  endSong: () => dispatch(endSong()),
  playSong: (url, id) => dispatch(playSong(url, id)),
  pauseSong: () => dispatch(pauseSong()),
  loopSongToggle: () => dispatch(loopSongToggle()),
  muteSong: (bool) => dispatch(muteSong(bool)),
});

class WebPlayer extends React.Component {
  constructor(props){
    super(props);
    this.isVisible = false;
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleRewind = this.handleRewind.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.ref = this.ref.bind(this);
    this.volumeBar = this.volumeBar.bind(this);
    this.showSlider = this.showSlider.bind(this);
    this.repeatIcon = React.createRef();
    this.repeatIconOn = React.createRef();
    this.progressBarRef = React.createRef();
    this.volumeLevel = React.createRef();
    this.slider = React.createRef();
    this.playerRef = null;
  }

  componentDidUpdate(){
    if (this.props.player.playing){
      this.isVisible = true;
    }
  }

  handleDisplay(icon){
    if (icon === "play") {
      if (this.props.player.playing === true) {
        return { display: "none" }
      }
    } else if (icon === "pause") {
      if (this.props.player.playing === false) {
        return { display: "none" };
      }
    }
    return {};
  }

  handlePlay(e){
    e.stopPropagation();
    if (this.props.player.url !== null) {
      this.props.playSong(this.props.player.url, this.props.player.id);
    } else {
      this.props.playSong(
        this.props.songs[this.props.player.id].audio,
        this.props.player.id
      );
    }
  }

  handlePause(e){
    e.stopPropagation();
    this.props.pauseSong();
  }

  handleRewind(e){
    e.stopPropagation();
    this.playerRef.seekTo(0, 'seconds');
  }

  handleSkip(e){
    let ids = Object.keys(this.props.songs);
    let nextId = ids[Math.floor(Math.random() * ids.length)];

    e.stopPropagation();
    this.props.endSong();
    this.props.playSong(this.props.songs[nextId].audio, nextId);
  }

  formatTime(duration){
    let seconds = Math.floor(duration % 60);
    let minutes = Math.floor(duration / 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  getTimeElapsed(){
    return this.formatTime(this.props.player.played * this.props.player.duration);
  }

  getDuration(){
    return this.formatTime(this.props.player.duration);
  }

  progressBar(){
    if (this.progressBarRef.current === null) {
      return { width: "0px" };
    }
    let width = Math.floor(this.props.player.played * this.progressBarRef.current.offsetWidth);
    return { width: `${width}px` };
  }

  handleRepeat(mode){
    if (mode === "off") {
      this.repeatIcon.current.style.display = "none";
      this.repeatIconOn.current.style.display = "inline-block";
    } else if (mode === "on") {
      this.repeatIcon.current.style.display = "inline-block";
      this.repeatIconOn.current.style.display = "none";
    }
    this.props.loopSongToggle();
  }

  ref(player){
    this.playerRef = player;
  }

  volumeBar(e){
    let bounds = e.currentTarget.getBoundingClientRect();
    let y = bounds.bottom - e.clientY;
    let volumeLevel;

    if (y < 17) {
      volumeLevel = 0.0;
    } else if (y > 107) {
      volumeLevel = 1.0;
    } else {
      volumeLevel = (y - 16) / 92;
    }
    this.volumeLevel.current.style.height = Math.floor(volumeLevel * 92) + "px";
    this.props.setVolume(volumeLevel);
  }

  showSlider(bool){
    return () => {
      if (bool === true) {
        this.slider.current.style.display = "inline-block";
      } else if (bool === false) {
        this.slider.current.style.display = "none";
      }
    };
  }

  render(){
    if (this.props.player.id === null){
      return null;
    }

    const { player, songs, users } = this.props;
    return (
    <div id="player_container">
      <div className="react_player text"
          style={{ display: (this.isVisible ? "block" : "none") }}>
        <ReactPlayer
          width="0" height="0"
          ref={this.ref}
          url={player.url}
          playing={player.playing}
          loop={player.loop}
          volume={player.volume}
          muted={player.muted}
          onDuration={this.props.setDuration}
          onProgress={this.props.setProgress}
          onEnded={this.props.endSong}/>
        <img id="player_rewind" onClick={this.handleRewind} src="/sprite-sheet.png" />
        <img id="player_play" onClick={this.handlePlay} style={this.handleDisplay("play")} src="/sprite-sheet.png" />
        <img id="player_pause" onClick={this.handlePause} style={this.handleDisplay("pause")} src="/sprite-sheet.png" />
        <img id="player_skip" onClick={this.handleSkip} src="/sprite-sheet.png" />
        <img id="player_repeat" ref={this.repeatIcon} onClick={() => this.handleRepeat("off")} src="/sprite-sheet.png" />
        <img id="player_repeat_on" ref={this.repeatIconOn} onClick={() => this.handleRepeat("on")} src="/repeat_on.jpg" />
        <div id="time_elapsed">{this.getTimeElapsed()}</div>
        <div id="progress_bar" ref={this.progressBarRef}><div style={this.progressBar()} id="elapsed_bar"></div></div>
        <div id="duration">{this.getDuration()}</div>
        <img id="volume_high" onClick={() => this.props.muteSong(true)} style={{display: (player.volume >= 0.5 && !player.muted ? "inline-block" : "none")}} onMouseEnter={this.showSlider(true)} src="/sprite-sheet.png" />
        <img id="volume_low" onClick={() => this.props.muteSong(true)} style={{ display: (player.volume < 0.5 && player.volume > 0.0 && !player.muted ? "inline-block" : "none") }} onMouseEnter={this.showSlider(true)} src="/sprite-sheet.png" />
        <img id="volume_mute" onClick={() => this.props.muteSong(false)} style={{ display: (player.volume === 0.0 || player.muted ? "inline-block" : "none") }} onMouseEnter={this.showSlider(true)} src="/sprite-sheet.png" />
        <img id="player_song_img" src={songs[player.id].photoURL}/>
        <div id="player_username">{users[songs[player.id].user_id].username}</div>
        <div id="player_song_name">{songs[player.id].name}</div>
        <div id="volume_slider" ref={this.slider} onClick={this.volumeBar} onMouseLeave={this.showSlider(false)}>
          <div id="triangle-down"></div>
          <div id="volume_bar">
            <div id="volume_level" ref={this.volumeLevel}></div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebPlayer);