import React from 'react';
import { connect } from 'react-redux';
import { fetchSong } from "../../actions/song_actions";
import { playSong } from '../../actions/player_actions';

const msp = (state, ownProps) => ({
  songs: state.entities.songs,
});

const mdp = (dispatch) => ({
  fetchSong: (songId) => dispatch(fetchSong(songId)),
  playSong: (audio) => dispatch(playSong(audio)),
});

class HomepageSongs extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if (Object.keys(this.props.songs).length === 0){
      this.props.fetchSong(3)
        .then(res => console.log(this.props.songs));
    }
  }

  render(){
    console.log("render")
    let songImg = null;
    let id = null;
    if (Object.keys(this.props.songs).length > 0){
      id = Object.keys(this.props.songs)[0];
      songImg = <img style={{width:"180px", height:"180px"}} src={this.props.songs[id].photoURL} />
    } else {
      return null;
    }
    let songItems = [];
    for (let i=0; i < 12; i++){
      songItems.push(<div key={i} onClick={() => this.props.playSong(this.props.songs[id].audio)} className="song__item">{songImg}{this.props.songs[id].name}<br />{this.props.songs[id].username}</div>);
    }
    return (
      <div className="songs__grid">
        {songItems}
      </div>
    );
  }
}

export default connect(msp, mdp)(HomepageSongs);