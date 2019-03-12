import React from 'react';
import { connect } from 'react-redux';
import ArtistsContainer from './user/artists';
import MusicContainer from './song/music';
import GenresContainer from './song/genres';
import { fetchUsers } from '../actions/user_actions';
import { fetchSongs } from '../actions/song_actions';

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchSongs: () => dispatch(fetchSongs()),
});

class CollectionContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { tab: null };
  }

  componentDidMount(){
    this.props
      .fetchUsers()
      .then(users => this.setState({ tab: "artists" }));
    this.props.fetchSongs()
  }

  modifyStyle(tab){
    if (tab === this.state.tab){
      return {
        color: "#f50",
        borderBottomColor: "#f50"
      };
    }
    return {};
  }

  tabComponent(){
    switch (this.state.tab) {
      case "artists":
        return <ArtistsContainer />;
      case "music":
        return <MusicContainer />;
      case "genres":
        return <GenresContainer />;
      default:
        return null;
    }
  }

  render(){
    return (
    <div className="collection_page text">
    <ul className="collection_tabs">
      <li onClick={() => this.setState({tab: "artists"})} style={this.modifyStyle("artists")}>Artists</li>
      <li onClick={() => this.setState({tab: "music"})} style={this.modifyStyle("music")}>Music</li>
      <li onClick={() => this.setState({tab: "genres"})} style={this.modifyStyle("genres")}>Genres</li>
    </ul>
    {this.tabComponent()}
    </div>)
  }
}

export default connect(null, mapDispatchToProps)(CollectionContainer);