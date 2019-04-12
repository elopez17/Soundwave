import React from 'react';
import { connect } from 'react-redux';
import { 
  fetchSong,
  fetchSongs
 } from "../../actions/song_actions";
import { 
  playSong,
  pauseSong 
} from '../../actions/player_actions';

const mapStateToProps = (state, ownProps) => ({
  songs: state.entities.songs,
  users: state.entities.users,
  player: state.ui.player,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSongs: () => dispatch(fetchSongs()),
  fetchSong: (songId) => dispatch(fetchSong(songId)),
  playSong: (audio, id) => dispatch(playSong(audio, id)),
  pauseSong: () => dispatch(pauseSong()),
});

class HomepageSongs extends React.Component {
  constructor(props){
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    if (Object.keys(this.props.songs).length < 12){
      this.props.fetchSongs();
    }
  }

  handleHover(isHover, idx, url){
    return () => {
      if (isHover === true &&
        (this.props.player.playing === false ||
          this.props.player.url !== url)) {
        this.refs["playIcon"+idx].style.display = "inline-block";
        this.refs["pauseIcon"+idx].style.display = "none";
      } else {
        this.refs["playIcon"+idx].style.display = "none";
      }
    };
  }

  handleClick(idx, url, id){
    return (e) => {
      e.stopPropagation();
      this.props.playSong(url, id);
      this.refs["playIcon"+idx].style.display = "none";
    };
  }

  iconShow(icon, songId){
    const { player } = this.props;
    
    if (icon === "play") {
      return { display: "none" };
    } else if (icon === "pause") {
      return { display: (player.playing && songId === player.id ? "inline-block" : "none") };
    }
    return {};
  }

  render(){
    let songItems = [];
    let songImg = null;
    let ids = Object.keys(this.props.songs);
    const { songs } = this.props;
    
    if (ids.length < 12){
      return null;
    }
    for (let i=0; i < 12; i++){
      songImg = <img className="song_item_img" src={songs[ids[i]].photoURL} />
      songItems.push(
        <div
          key={i}
          onClick={this.handleClick(i, songs[ids[i]].audio, ids[i])}
          onMouseEnter={this.handleHover(true, i, songs[ids[i]].audio)}
          onMouseLeave={this.handleHover(false, i, songs[ids[i]].audio)}
          className="song__item" >
          {songImg}
          <div className="text song_name">{songs[ids[i]].name}</div>
          <div className="text song_username">{this.props.users[songs[ids[i]].user_id].username}</div>
          <span className="play__icon homepageSongs_play_icon" style={this.iconShow("play", parseInt(ids[i], 10))} ref={"playIcon"+i} />
          <span className="pause_icon homepageSongs_play_icon" style={this.iconShow("pause", parseInt(ids[i], 10))} ref={"pauseIcon"+i}
            onClick={(e) => {
              e.stopPropagation();
              this.props.pauseSong();
            }}/>
        </div>
      );
    }
    return (
      <div className="songs__grid">
        {songItems}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageSongs);