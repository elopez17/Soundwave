import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import { closeModal, openModal } from '../../actions/modal_actions';
import { receiveErrors, clearErrors } from '../../actions/session_actions';


const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: 'signup_password',
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (payload) => dispatch(openModal(payload)),
  closeModal: () => dispatch(closeModal()),
  receiveErrors: (errors) => dispatch(receiveErrors(errors)),
  clearErrors: () => dispatch(clearErrors()),
});

class SignupPasswordForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: props.email, password: ''};
    this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(){
    if (this.state.password.length < 6) {
      this.props.receiveErrors(['Use at least 6 characters.']);
      this.props.openModal({
        email: this.state.email,
        modal: 'signup_password'});
      return -1;
    } else {
      this.props.clearErrors();
      this.props.openModal({
        email: this.state.email,
        modal: 'signup_personal',
        password: this.state.password});
    }
  }

  render(){
    return (
      <form className="signup-password-form">
        <h1 className="signup-header">Create your Soundwave<br/>account</h1>
        <input readOnly className="signup-password-email" onClick={() => this.props.openModal({ email: this.state.email, modal: 'signup' })} type='text' value={this.state.email} />
        <div className="password-label">Choose a password<span className="color-orange">*</span></div>
        <input className="signup-password-inp" onChange={this.updateField('password')} type='password' value={this.state.password} />
        <div className="signup-password-errors">{this.props.errors[0]}</div>
        <div className="signup-validation">
          <input className="checkbox" type="checkbox"/>
          <span className="robo-txt">I'm not a robot</span>
          <img className="recaptcha-img" src="/recaptcha.png" />
        </div>
        <div className="terms-of-use">
          By signing up I accept the Terms of Use. I have read and understood<br/>
          the Privacy Policy and Cookies Policy.
        </div>
        <button className="signup-password-submit continue-btn" onClick={this.handleSubmit}>Accept & continue</button>
      </form>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupPasswordForm));
