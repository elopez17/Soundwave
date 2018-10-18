import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';

const msp = (state, ownProps) => ({
  users: state.entities.users,
});

const mdp = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

class UserPageContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {user: {username: ''}};
  }

  componentDidMount(){
    this.props.fetchUser(this.props.match.params.userId)
    .then(res => this.setState({user: res.user}))
    .then(()=> console.log(this.state));
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.props.fetchUser(this.props.match.params.userId)
      .then(res => this.setState({user: res.user}))
      .then(()=> console.log(this.state));
    }
  }

  render(){
    return (
  <div className="user-show-page">
    <div className="user-show-header">
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
