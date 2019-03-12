import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
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
    this.redirectCollection = this.redirectCollection.bind(this);
    this.redirectUpload = this.redirectUpload.bind(this);
  }

  redirectHome(){
    this.props.history.push(`/users/${this.props.currentUser}`);
  }

  redirectCollection(){
    this.props.history.push(`/users/${this.props.currentUser}/collection`);
  }

  redirectUpload() {
    this.props.history.push(`/users/${this.props.currentUser}/upload`);
  }

  render(){
    let home = (this.props.location.pathname === `/users/${this.props.currentUser}`) ? { backgroundColor: "#111", color: "white"} : {};
    let collection = (this.props.location.pathname === `/users/${this.props.currentUser}/collection`) ? { backgroundColor: "#111", color: "white"} : {};
    let upload = (this.props.location.pathname === `/users/${this.props.currentUser}/upload`) ? { backgroundColor: "#111", color: "white"} : {};

    if (!this.props.currentUser) {
      return null;
    }
    return (
      <div className="header-bar-position">
      <div className="header-bar-background">
      <ul className="header-bar">
        <li className="header-bar-logo-back"><div onClick={this.redirectHome.bind(this)} className="header-bar-logo"></div></li>
        <li onClick={this.redirectHome} style={home}>Home</li>
        <li style={collection} onClick={this.redirectCollection}>Collection</li>
        <li><input className="header-search-bar" type='text' placeholder="Search"/></li>
        <li style={upload} onClick={this.redirectUpload}>Upload</li>
        <li onClick={() => this.props.logout().then(() => this.props.history.push('/'))}>Sign out</li>
      </ul>
      </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
