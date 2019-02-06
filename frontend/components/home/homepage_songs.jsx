import React from 'react';
import { connect } from 'react-redux';
import { 
  fetchSong,
  fetchSongs
 } from "../../actions/song_actions";
import { playSong } from '../../actions/player_actions';

const msp = (state, ownProps) => ({
  songs: state.entities.songs,
});

const mdp = (dispatch) => ({
  fetchSongs: () => dispatch(fetchSongs()),
  fetchSong: (songId) => dispatch(fetchSong(songId)),
  playSong: (audio) => dispatch(playSong(audio)),
});

class HomepageSongs extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if (Object.keys(this.props.songs).length === 0){
      this.props.fetchSongs()
        .then(res => console.log(this.props.songs));
    }
  }

  render(){
    let songItems = [];
    let songImg = null;
    let ids = Object.keys(this.props.songs);
    
    if (ids.length < 12){
      return null;
    }
    for (let i=0; i < 12; i++){
      songImg = <img style={{width:"180px", height:"180px"}} src={this.props.songs[ids[i]].photoURL} />
      songItems.push(<div key={i} onClick={() => this.props.playSong(this.props.songs[ids[i]].audio)} className="song__item">{songImg}{this.props.songs[ids[i]].name}</div>);
    }
    return (
      <div className="songs__grid">
        {songItems}
      </div>
    );
  }
}

export default connect(msp, mdp)(HomepageSongs);