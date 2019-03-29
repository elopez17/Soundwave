import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSongsArr } from '../selectors/songs';
import { getUsersArr } from '../selectors/users';
import { fetchUsers } from '../actions/user_actions';
import { fetchSongs } from '../actions/song_actions';

const mapStateToProps = state => ({
  songs: getSongsArr(state),
  users: getUsersArr(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchSongs: () => dispatch(fetchSongs())
});

const genres = [
  "blues",
  "electronic",
  "hip-hop",
  "jazz",
  "lo-fi",
  "piano",
  "pop",
  "rap",
  "rock",
  "r&b"
];

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filter: "",
      focused: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount(){
    this.props.fetchSongs();
    this.props.fetchUsers();
  }

  handleChange(e){
    this.setState({filter: e.target.value});
  }

  keyPress(e){
    if (e.keyCode === 13 && this.state.filter.length > 0) {
      let filter = this.state.filter.toLowerCase();
      this.setState({ focused: false }); 
      if (this.props.location.pathname === "/search"){
        this.props.history.replace({
          pathname: "/search",
          state: { filter: this.state.filter }
        });
      } else {
        this.props.history.push({
          pathname: "/search",
          state: { filter: this.state.filter }
        });
      }
    }
  }

  handleClick(str){
    return (e) => {
      e.stopPropagation();
      this.setState({ filter: str, focused: false });
      let matched = this.props.songs.filter(song => song.name === str)
      if (matched.length > 0){
        this.props.history.push(`/users/${matched[0].user_id}`);
      } else {
        matched = this.props.users.filter(user => user.username === str);
        this.props.history.push(`/users/${matched[0].id}`);
      }
    };
  }

  suggestSearch(filter){
    let results = [];

    if (filter.length < 1 || !this.state.focused){
      return null;
    }
    let songs = this.props.songs.filter(song =>
      song.name.toLowerCase().includes(filter)
    );
    let users = this.props.users.filter(user =>
      user.username.toLowerCase().includes(filter)
    );
    songs.map(song => results.push(song.name))
    users.map(user => results.push(user.username))
    results = results.slice(0, 10);
    if (results.length > 0) {
      return results.map((str, i) => (
        <div key={i} className="suggest_search"
          onClick={this.handleClick(str)}>
          {str}
        </div>
      ));
    } else {
      return <div className="suggest_search"
        onClick={() => this.keyPress({keyCode: 13})}>
        Search for "{this.state.filter}"
      </div>
    }
  }

  render(){
    return (
      <span>
        <input
          className={this.props.className}
          type="text"
          placeholder="Search for artists, bands, tracks"
          onChange={this.handleChange}
          value={this.state.filter}
          onFocus={() => this.setState({ focused: true })}
          onKeyDown={this.keyPress}
        />
        {this.suggestSearch(this.state.filter.toLowerCase())}
      </span>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));