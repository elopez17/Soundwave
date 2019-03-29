import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSongsArr } from '../selectors/songs';
import { getUsersArr } from '../selectors/users';
import { playSong, pauseSong } from "../actions/player_actions";
import CommentsBar from "./user/comments_bar";

const mapStateToProps = state => ({
  songs: getSongsArr(state),
  users: getUsersArr(state),
  player: state.ui.player
});

const mapDispatchToProps = dispatch => ({
  playSong: (url, id) => dispatch(playSong(url, id)),
  pauseSong: () => dispatch(pauseSong())
});

class SearchContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTab: null
    };
    if (!this.props.location.state) {
      this.props.location.state = { filter: "" };
    }
    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.moveBar = this.moveBar.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this)
    this._isMounted = false;
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.player !== nextProps.player ||
      this.props.location.state.filter !== nextProps.location.state.filter ||
      this.state.searchTab !== nextState.searchTab) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.setState({ searchTab: "everything"});
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  isSelected(tabName){
    if (this.state.searchTab === tabName) {
      return true;
    } else {
      return false;
    }
  }

  handlePlay(url, id) {
    return (e) => {
      e.stopPropagation();
      this.props.playSong(url, id);
      this.refs["playIcon" + id].style.display = "none";
      this.refs["pauseIcon" + id].style.display = "inline-block";
    };
  }

  handlePause(id) {
    return (e) => {
      e.stopPropagation();
      this.props.pauseSong();
      this.refs["pauseIcon" + id].style.display = "none";
      this.refs["playIcon" + id].style.display = "inline-block";
    };
  }

  moveBar(url, id) {
    if (this._isMounted === false) {
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

  handleRedirect(userId) {
    return (e) => {
      e.stopPropagation();
      this.props.history.push(`/users/${userId}`);
    };
  }

  placeResults(){
    let songs = [];
    let users = [];
    let filter = this.props.location.state.filter.toLowerCase();

    if (this.state.searchTab === "tracks" || this.state.searchTab === "everything") {
      songs = this.props.songs.filter(song => song.name.toLowerCase().includes(filter))
    }
    if (this.state.searchTab === "people" || this.state.searchTab === "everything") {
      users = this.props.users.filter(user => user.username.toLowerCase().includes(filter))
    }
    return (
    <div>
    {
      songs.map(song => (
        <div className="track_container" key={song.id}>
          <img width="160" height="160" src={song.photoURL} />
          <span className="track_info_container">
            <span onClick={this.handlePlay(song.audio, song.id)} className="play__icon tracks_play_icon" ref={"playIcon" + song.id} />
            <span onClick={this.handlePause(song.id)} className="pause_icon tracks_play_icon" style={{ display: "none" }} ref={"pauseIcon" + song.id}></span>
            <span className="track_username text">user name<br /></span>
            <span className="track_name text">{song.name}</span>
            <img className="track_waveform waveform_img" src={song.waveform} />
            <span className="track_waveform track_line" ref={"track_line" + song.id} />
            <span className="track_waveform track_bar" ref={"track_bar" + song.id} style={this.moveBar(song.audio, song.id)} />
            <CommentsBar songId={song.id} commentIds={song.comments} playing={song.audio === this.props.player.url} />
          </span>
        </div>
      ))
    }
    {
      users.map(user => (
        <div className="search_user text" onClick={this.handleRedirect(user.id)} key={user.id}>
          <img src={user.photoURL} />
          <div>{user.username}</div>
        </div>
      ))
    }
    </div>);
  }

  render(){
    return (
      <div className="search_page text">
        <div className="search_page_title">
          Search Results for "{this.props.location.state.filter}"
        </div>
        <div id="search_page_grid">
          <ul id="search_tabs">
            <li className={this.isSelected("everything") ? "active" : ""}
              onClick={() => this.setState({ searchTab: "everything"})}>
              <img src="search_icon_white.png" className="size_30" />
              <div>Everything</div>
            </li>
            <li className={this.isSelected("tracks") ? "active" : ""}
              onClick={() => this.setState({ searchTab: "tracks" })}>
              <img src="soundwave_icon_white.jpg" className="size_30" />
              <div>Tracks</div>
            </li>
            <li className={this.isSelected("people") ? "active" : ""}
              onClick={() => this.setState({ searchTab: "people" })}>
              <img src="person_icon.png" className="size_30" />
              <div>People</div>
            </li>
          </ul>
          {this.placeResults()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchContainer));