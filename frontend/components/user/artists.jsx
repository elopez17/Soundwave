import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  artists: Object.values(state.entities.users).sort((a, b) => (a.username.localeCompare(b.username)))
});

class ArtistsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleRedirect(userId){
    return (e) => {
      e.stopPropagation();
      this.props.history.push(`/users/${userId}`);
    };
  }

  render() {
    return (
    <div className="artists_grid">
    {
      this.props.artists.map(artist => (
        <div onClick={this.handleRedirect(artist.id)} key={artist.id}>
          <img src={artist.photoURL}/>
          <div>{artist.username}</div>
        </div>
      ))
    }
    </div>);
  }
}

export default withRouter(connect(mapStateToProps, null)(ArtistsContainer));