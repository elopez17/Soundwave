import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postSong, getWaveform } from '../../util/song_api_util';
import { playSong, pauseSong } from '../../actions/player_actions';
import CommentsBar from './comments_bar';

const mapStateToProps = (state) => ({
  comments: state.entities.comments,
  sessionId: state.session.id,
  player: state.ui.player,
});

const mapDispatchToProps = (dispatch) => ({
  playSong: (url, id) => dispatch(playSong(url, id)),
  pauseSong: () => dispatch(pauseSong()),
});

class UserTracks extends React.Component {
  constructor(props){
    super(props);
    this.redirectUpload = this.redirectUpload.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.moveBar = this.moveBar.bind(this);
    this._isMounted = false;
  }

  componentDidMount(){
    this._isMounted = true;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState){
    if (nextProps.userId !== this.props.userId){
      this._isMounted = false;
    }
  }

  componentDidUpdate(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  redirectUpload(){
    this.props.history.push(`/users/${this.props.userId}/upload`);
  }

  handlePlay(url, id){
    return (e) => {
      e.stopPropagation();
      this.props.playSong(url, id);
      this.refs["playIcon" + id].style.display = "none";
      this.refs["pauseIcon" + id].style.display = "inline-block";
    };
  }

  handlePause(id){
    return (e) => {
      e.stopPropagation();
      this.props.pauseSong();
      this.refs["pauseIcon" + id].style.display = "none";
      this.refs["playIcon" + id].style.display = "inline-block";
    };
  }

  moveBar(url, id){
    if (this._isMounted === false){
      return {};
    }
    if (this.props.player.url === url && this.refs["track_line" + id]) {
      let progress = Math.floor(
        this.props.player.played * this.refs["track_line" + id].offsetWidth
      );
      this.refs["track_bar" + id].style.left = progress.toString() + "px";
    } else {
      if (this.refs["pauseIcon" + id] && this.refs["playIcon" + id]) {
        this.refs["pauseIcon" + id].style.display = "none";
        this.refs["playIcon" + id].style.display = "inline-block";
      }
      return { left: "0px" };
    }
    return {};
  }

  render() {
    let tracks = this.props.songs;
    let uploadButton = null;

    if (this.props.userId === this.props.sessionId) {
      uploadButton = <span onClick={this.redirectUpload} className="upload_now text">Upload now</span>;
    }
    if (tracks.length < 1){
      return (
        <div className="user-show-tracks no_tracks text">
          <img src="/soundwave-folder.png" width="250" height="250"/>
          <div id="no_tracks_caption">Seems a little quiet over here</div>
          {uploadButton}
        </div>
      );
    }
    return (
    <div className="user-show-tracks">
    {
      tracks.map(song => (
        <div className="track_container" key={song.id}>
          <img width="160" height="160" src={song.photoURL} />
          <span className="track_info_container">
            <span onClick={this.handlePlay(song.audio, song.id)} className="play__icon tracks_play_icon" ref={"playIcon" + song.id} />
            <span onClick={this.handlePause(song.id)} className="pause_icon tracks_play_icon" style={{display:"none"}} ref={"pauseIcon" + song.id}></span>
            <span className="track_username text">{this.props.username}<br /></span>
            <span className="track_name text">{song.name}</span>
            <img className="track_waveform waveform_img" src={song.waveform} />
                <span className="track_waveform track_line" ref={"track_line" + song.id} />
            <span className="track_waveform track_bar" ref={"track_bar" + song.id} style={this.moveBar(song.audio, song.id)}/>
            <CommentsBar songId={song.id} commentIds={song.comments} playing={song.audio === this.props.player.url} />
          </span>
        </div>))
    }
    </div>);
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTracks));