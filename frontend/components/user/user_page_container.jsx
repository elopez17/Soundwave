import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';

const msp = (state, ownProps) => ({
  users: state.entities.users,
  sessionId: state.session.id,
});

const mdp = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

class UserPageContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {user: {id: null, username: '', photoURL: '', photoFile: null}};
    this.getFile = this.getFile.bind(this);
  }

  componentDidMount(){
    this.props.fetchUser(this.props.match.params.userId)
      .then(res => this.setState({user: res.user}));
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.user.id !== this.state.user.id ||
      nextProps.match.params.userId !== this.props.match.params.userId ||
      nextState.user.photoURL !== this.state.user.photoURL) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.props.fetchUser(this.props.match.params.userId)
        .then(res => this.setState({user: res.user}));
    }
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
      <div className="user-show-tabs">
        <div className="user-show-tab">Tracks</div>
      </div>
      <div className="user-show-tracks">My<br/>first track<br/>is<br/>coming soon</div>
      <div className="user-show-sidebar"></div>
    </div>
  </div>
    );
  }

}

export default connect(msp,mdp)(UserPageContainer);
