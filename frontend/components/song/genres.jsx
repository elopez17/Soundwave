import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getGenres } from '../../selectors/genres';
import { playSong, pauseSong } from "../../actions/player_actions";

const mapStateToProps = state => ({
  genres: getGenres(state),
  player: state.ui.player
});

const mapDispatchToProps = dispatch => ({
  playSong: (audio, id) => dispatch(playSong(audio, id)),
  pauseSong: () => dispatch(pauseSong())
});

class GenresContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleRedirect(userId) {
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
      if (this.refs["pauseIcon" + this.props.player.id]){
        this.refs["pauseIcon" + this.props.player.id].style.display = "none";
      }
      this.props.playSong(url, id);
      this.refs["playIcon" + id].style.display = "none";
      this.refs["pauseIcon" + id].style.display = "inline-block";
    };
  }

  formatSongs(songs){
    return (
    <div className="music_grid">
      {
        songs.map(song => (
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

  render() {
    return (
    <div className="collection_genre">
      <div id="talkbubble">blues</div>
      {this.formatSongs(this.props.genres.blues)}
      <div id="talkbubble">electronic</div>
      {this.formatSongs(this.props.genres.electronic)}
      <div id="talkbubble">hip-hop</div>
      {this.formatSongs(this.props.genres.hipHop)}
      <div id="talkbubble">jazz</div>
      {this.formatSongs(this.props.genres.jazz)}
      <div id="talkbubble">lo-fi</div>
      {this.formatSongs(this.props.genres.loFi)}
      <div id="talkbubble">piano</div>
      {this.formatSongs(this.props.genres.piano)}
      <div id="talkbubble">pop</div>
      {this.formatSongs(this.props.genres.pop)}
      <div id="talkbubble">rap</div>
      {this.formatSongs(this.props.genres.rap)}
      <div id="talkbubble">rock</div>
      {this.formatSongs(this.props.genres.rock)}
      <div id="talkbubble">r&b</div>
      {this.formatSongs(this.props.genres.rB)}
    </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GenresContainer)
);