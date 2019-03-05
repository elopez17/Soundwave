import React from 'react';
import ReactPlayer from "react-player";
import { connect } from 'react-redux';
import { 
  setDuration,
  setProgress,
  endSong
} from '../actions/player_actions';

const mapStateToProps = (state) => ({
  player: state.ui.player,
});

const mapDispatchToProps = (dispatch) => ({
  setDuration: (duration) => dispatch(setDuration(duration)),
  setProgress: (progress) => dispatch(setProgress(progress)),
  endSong: () => dispatch(endSong()),
});

class WebPlayer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return <ReactPlayer width="0" height="0"
    url={this.props.player.url}
    playing={this.props.player.playing}
    onDuration={this.props.setDuration}
    onProgress={this.props.setProgress}
    onEnded={this.props.endSong}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebPlayer);