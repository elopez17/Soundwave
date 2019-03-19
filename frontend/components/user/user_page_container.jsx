import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import { fetchSongsByUser } from '../../actions/song_actions';
import UserTracks from './user_tracks.jsx'
import TracksGenre from './tracks_genre.jsx';

const mapStateToProps = (state, ownProps) => ({
  comments: state.entities.comments,
  users: state.entities.users,
  sessionId: state.session.id,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchSongsByUser: userId => dispatch(fetchSongsByUser(userId)),
});

class UserPageContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {user: {id: null, username: '', songs: [], photoURL: '', photoFile: null}};
    this.getFile = this.getFile.bind(this);
  }

  componentDidMount(){
    this.getUserInfo(this.props.match.params.userId);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.comments !== this.props.comments ||
      nextProps.match.params.userId !== this.props.match.params.userId) {
      this.getUserInfo(nextProps.match.params.userId);
    }
    if (nextState.user !== this.state.user) {
      return true;
    }
    return false;
  }

  getUserInfo(userId){
    this.props.fetchUser(userId)
      .then(res => {
        this.props.fetchSongsByUser(res.user.id)
          .then(res2 => {
            res.user.songs = Object.values(res2.songs);
            this.setState({ user: res.user });
          });
      });
  }

  profilePic(photoURL){
    if (photoURL) {
      return <img src={photoURL}/>;
    }
    return null;
  }

  getFile(){
    return (e) => {
      const reader = new FileReader();
      const file = e.currentTarget.files[0];
      if (file) {
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('user[photo]', file);
        $.ajax({
          url: `/api/users/${this.props.sessionId}`,
          method: 'PATCH',
          data: formData,
          contentType: false,
          processData: false
        }).then(res => this.props.fetchUser(this.props.sessionId).then(res => this.setState({ user: res.user })));
      } else {
        this.setState({photoURL: '', photoFile: null});
      }

    };
  }

  uploadProfilePic(){
    if (this.state.user.id !== this.props.sessionId) {
      return null;
    }
    return (
      <label className="update-profile-pic" htmlFor="profile-pic">Update image
        <input onChange={this.getFile()} type="file" id="profile-pic" style={{display:'none'}} />
      </label>
    );
  }

  render(){
    return (
  <div className="user-show-page">
    <div className="user-show-header">
      <div className="user-show-pic">
        {this.profilePic(this.state.user.photoURL)}
      </div>
      {this.uploadProfilePic()}
      <div className="user-show-username">{this.state.user.username}</div>
    </div>
    <div className="user-show-grid-container">
      <div className="user-show-tabs text">
        <div className="user-show-tab">Tracks</div>
      </div>
      <div className="user_show_genre text">Genre</div>
      <UserTracks username={this.state.user.username} songs={this.state.user.songs} userId={parseInt(this.props.match.params.userId, 10)}/>
      <TracksGenre songs={this.state.user.songs} />
    </div>
  </div>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(UserPageContainer);
