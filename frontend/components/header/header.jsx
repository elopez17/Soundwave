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

  redirectHome(){
    this.props.history.push(`/users/${this.props.currentUser}`);
  }

  render(){
    if (!this.props.currentUser) {
      return null;
    }
    return (
      <div className="header-bar-background">
      <ul className="header-bar">
        <li className="header-bar-logo-back"><div onClick={this.redirectHome.bind(this)} className="header-bar-logo"></div></li>
        <li className="header-bar-home" onClick={this.redirectHome.bind(this)}>Home</li>
        <li className="header-bar-collection">Collection</li>
        <li className="header-bar-search"><input className="header-search-bar" type='text' placeholder="Search"/></li>
        <li className="header-bar-upload">Upload</li>
        <li className="header-bar-profile">Profile</li>
        <li className="header-bar-dropdown">
          <button className="header-bar-signout" onClick={() => this.props.logout().then(() => this.props.history.push('/'))}>Sign out</button>
        </li>
      </ul>
      </div>
    );
  }
}


export default withRouter(connect(msp, mdp)(Header));
