import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state) => ({
  currentUser: state.session.id,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

class Header extends React.Component {
  constructor(props){
    super(props);
    this.redirectHome = this.redirectHome.bind(this);
    this.redirectUpload = this.redirectUpload.bind(this);
  }

  redirectHome(){
    this.props.history.push(`/users/${this.props.currentUser}`);
  }

  redirectUpload() {
    this.props.history.push(`/users/${this.props.currentUser}/upload`);
  }

  render(){
    if (!this.props.currentUser) {
      return null;
    }
    return (
      <div className="header-bar-position">
      <div className="header-bar-background">
      <ul className="header-bar">
        <li className="header-bar-logo-back"><div onClick={this.redirectHome.bind(this)} className="header-bar-logo"></div></li>
        <li onClick={this.redirectHome}>Home</li>
        <li>Collection</li>
        <li><input className="header-search-bar" type='text' placeholder="Search"/></li>
        <li onClick={this.redirectUpload}>Upload</li>
        <li onClick={() => this.props.logout().then(() => this.props.history.push('/'))}>Sign out</li>
      </ul>
      </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
