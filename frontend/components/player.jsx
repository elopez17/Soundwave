import React from 'react';
import ReactPlayer from "react-player";
import { connect } from 'react-redux';

const msp = (state) => ({
  player: state.ui.player,
});

class WebPlayer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return <ReactPlayer url={this.props.player.url} playing={this.props.player.playing} />;
  }
}

export default connect(msp, null)(WebPlayer);