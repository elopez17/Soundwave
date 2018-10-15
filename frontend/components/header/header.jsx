import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import { logout } from '../../actions/session_actions';

const msp = (state) => ({
  currentUser: state.session.id,
});

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
});

class Header extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    if (!this.props.currentUser ||
        this.props.location.pathname === '/') {
      return null;
    }
    return (
      <div className="header-bar">
        <button onClick={() => this.props.logout().then(() => this.props.history.push('/'))}>Sign out</button>
      </div>
    );
  }
}


export default withRouter(connect(msp, mdp)(Header));
