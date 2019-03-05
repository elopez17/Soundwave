import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import { signup, login } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import { receiveErrors, clearErrors } from '../../actions/session_actions';


const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: 'signup_username',
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (payload) => dispatch(openModal(payload)),
  closeModal: () => dispatch(closeModal()),
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user)),
  receiveErrors: (errors) => dispatch(receiveErrors(errors)),
  clearErrors: () => dispatch(clearErrors()),
});

class SignupUsernameForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: props.email,
      username: '',
      password: props.password,
    };
    this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(){
    if (this.state.username.length === 0) {
      this.props.receiveErrors(['Enter your display name. You can change it later.']);
      this.props.openModal({
        email: this.state.email,
        modal: 'signup_username',
        password: this.state.password,
      });
      return -1;
    } else {
      this.props.clearErrors();
      this.props.closeModal();
      this.props.signup(this.state)
      .then(user => {
        this.props.login(this.state)
        .then(res => this.props.history.push(`/users/${res.user.id}`))
      }, err => this.props.openModal({
        email: this.state.email,
        modal: 'signup_username',
        password: this.state.password,
      }));
    }
  }

  render(){
    return (
  <form className="signup-username-form">
    <h1 className="signup-username-header">Tell us a bit<br/>about yourself</h1>
    <div className="signup-username-title">Choose your display name<span className="color-orange">*</span></div>
    <input className="signup-username-inp" onChange={this.updateField('username')} type='text' value={this.state.username} />
    <div className="signup-username-errors">{this.props.errors[0]}</div>
    <div className="signup-username-info">Your display name can be anything you like. Your name or artist<br/>name are good choices.</div>
    <button className="signup-username-submit continue-btn" onClick={this.handleSubmit}>Get started</button>
  </form>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupUsernameForm));
