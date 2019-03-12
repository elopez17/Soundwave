import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  let obj = { blues: [], electronic: [], hipHop: [],
   jazz: [], loFi: [], piano: [], pop: [],
  rap: [], rock: [], rB: [] };
  let songs = Object.values(state.entities.songs);

  for (let i = 0; i < songs.length; i++){
    if (songs[i].genre === "blues") {
      obj.blues.push(songs[i]);
    } else if (songs[i].genre === "electronic") {
      obj.electronic.push(songs[i]);
    } else if (songs[i].genre === "hip-hop") {
      obj.hipHop.push(songs[i]);
    } else if (songs[i].genre === "jazz") {
      obj.jazz.push(songs[i]);
    } else if (songs[i].genre === "lo-fi") {
      obj.loFi.push(songs[i]);
    } else if (songs[i].genre === "piano") {
      obj.piano.push(songs[i]);
    } else if (songs[i].genre === "pop") {
      obj.pop.push(songs[i]);
    } else if (songs[i].genre === "rap") {
      obj.rap.push(songs[i]);
    } else if (songs[i].genre === "rock") {
      obj.rock.push(songs[i]);
    } else if (songs[i].genre === "r&b") {
      obj.rB.push(songs[i]);
    }
  }
  return obj;
};

class GenresContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="collection_genre" id="talkbubble">blues</div>
        <div className="collection_genre" id="talkbubble">electronic</div>
        <div className="collection_genre" id="talkbubble">hip-hop</div>
        <div className="collection_genre" id="talkbubble">jazz</div>
        <div className="collection_genre" id="talkbubble">lo-fi</div>
        <div className="collection_genre" id="talkbubble">piano</div>
        <div className="collection_genre" id="talkbubble">pop</div>
        <div className="collection_genre" id="talkbubble">rap</div>
        <div className="collection_genre" id="talkbubble">rock</div>
        <div className="collection_genre" id="talkbubble">r&b</div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(GenresContainer));