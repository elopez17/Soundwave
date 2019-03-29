import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { logout, login } from '../../actions/session_actions';
import { openModal } from "../../actions/modal_actions";
import SearchBar from '../search_bar';

const mapStateToProps = (state) => ({
  currentUser: state.session.id,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: payload => dispatch(openModal(payload)),
  login: user => dispatch(login(user)),
});

class Header extends React.Component {
  constructor(props){
    super(props);
    this.redirectHome = this.redirectHome.bind(this);
    this.redirectCollection = this.redirectCollection.bind(this);
    this.redirectUpload = this.redirectUpload.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  redirectHome(){
    if (this.props.currentUser !== null){
      this.props.history.push(`/users/${this.props.currentUser}`);
    } else {
      this.props.history.push(`/`);
    }
  }

  redirectCollection(){
    if (this.props.currentUser !== null){
      this.props.history.push(`/users/${this.props.currentUser}/collection`);
    } else {
      this.props.history.push(`/collection`);
    }
  }

  redirectUpload() {
    if (this.props.currentUser !== null) {
      this.props.history.push(`/users/${this.props.currentUser}/upload`);
    } else {
      this.props.openModal({ modal: "signin", email: "" });
    }
  }

  getFunction(li){
    if (this.props.currentUser !== null) {
      if (li === "Upload") {
        return li;
      } else if (li === "Sign out") {
        return li;
      }
    } else {
      if (li === "Upload") {
        return <span className="header_bar_signin" >
          Sign in
            </span>;
      } else if (li === "Sign out") {
        return <span className="header_bar_create" >
          Create account
            </span>;
      }
    }
  }

  signOut(){
    if (this.props.currentUser !== null) {
      this.props.logout().then(() => this.props.history.push("/"));
    } else {
      this.props.openModal({ modal: "signup", email: "" });
    }
  }

  render(){
    let home = (this.props.location.pathname === `/users/${this.props.currentUser}`) ? { backgroundColor: "#111", color: "white"} : {};
    let collection = (this.props.location.pathname === `/users/${this.props.currentUser}/collection`) ? { backgroundColor: "#111", color: "white"} : {};
    let upload = (this.props.location.pathname === `/users/${this.props.currentUser}/upload`) ? { backgroundColor: "#111", color: "white"} : {};
    
    if (this.props.location.pathname === '/') {
      return null;
    }
    return (
      <div className="header-bar-position">
      <div className="header-bar-background">
      <ul className="header-bar">
        <li className="header-bar-logo-back"><div onClick={this.redirectHome.bind(this)} className="header-bar-logo"></div></li>
        <li onClick={this.redirectHome} style={home}>Home</li>
        <li style={collection} onClick={this.redirectCollection}>Collection</li>
        <li style={{position:"relative"}}><SearchBar className="header-search-bar" />
            <img className="search__icon header_search_pos"
            src="/sprite-sheet.png" />
        </li>
        <li style={upload} onClick={this.redirectUpload}>{this.getFunction("Upload")}</li>
        <li onClick={this.signOut}>{this.getFunction("Sign out")}</li>
      </ul>
      </div>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
