import React from 'react';
import { connect } from 'react-redux';
import { fetchSong } from "../../actions/song_actions";

import ReactPlayer from 'react-player';

const msp = (state, ownProps) => ({
  songs: state.entities.songs,
});

const mdp = (dispatch) => ({
  fetchSong: (songId) => dispatch(fetchSong(songId)),
});

class HomepageSongs extends React.Component {
  constructor(props){
    super(props);
    this.playSong = this.playSong.bind(this);
    this.state = {playing: false};
  }

  componentDidMount(){
    if (Object.keys(this.props.songs).length === 0){
      this.props.fetchSong(1)
        .then(res => console.log(this.props.songs));
    }
  }

  playSong(url){
    this.setState({playing: true});
  }

  render(){
    console.log("render")
    let songImg = null;
    if (Object.keys(this.props.songs).length > 0){
      songImg = <img style={{width:"180px", height:"180px"}} src={this.props.songs[1].photoURL} />
    } else {
      return null;
    }
    return (
      <div className="songs__grid">
        <div onClick={this.playSong} className="song__item">{songImg}{this.props.songs[1].name}<br/>{this.props.songs[1].username}</div>
        <div className="song__item">test</div>
        <div className="song__item">test<ReactPlayer url={this.props.songs[1].audio} playing={this.state.playing} /></div>
        <div className="song__item">test</div>
        <div className="song__item">test</div>
        <div className="song__item">test</div>
        <div className="song__item">test</div>
        <div className="song__item">test</div>
        <div className="song__item">test</div>
        <div className="song__item">test</div>
        <div className="song__item">test</div>
        <div className="song__item">test</div>
      </div>
    );
  }
}

export default connect(msp, mdp)(HomepageSongs);