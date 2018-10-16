import React from 'react';
import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { receiveErrors, clearErrors } from '../../actions/session_actions';

const msp = (state) => ({
  errors: state.errors.session,
  formType: 'signup',
});

const mdp = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (payload) => dispatch(openModal(payload)),
  receiveErrors: (errors) => dispatch(receiveErrors(errors)),
  clearErrors: () => dispatch(clearErrors()),
});

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: props.email, modal: 'signup_password'};
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(){
    if (this.state.email.length === 0) {
      this.props.receiveErrors(['Enter a valid email address']);
      this.props.openModal({email: '', modal: 'signup'});
      return -1;
    } else if (false === true) {
      // the condition for this else if block will be to
      // check if email is valid. eg. has '@' and ('.com' || '.net') etc.
      // if that is false, show errors on same form
    } else if (false === true) {
      // the condition for this else if block will be to
      // check if email exist
      // if that is true, open signin password form modal.
    } else {
      this.props.clearErrors();
      this.props.openModal(this.state);
    }
  }

  render(){
    return (
    <div>
      <div className="line-through"></div>
      <form className="signin-email-form">
        <input className="signin-email-inp" onChange={this.updateField('email')} type='text' value={this.state.email} placeholder="Your email address"/>
        <div className="signin-email-errors">{this.props.errors[0]}</div>
        <button className="continue-btn signin-email-submit" onClick={this.handleSubmit}>Continue</button>
          <div className="signin-email-agreements">We may use your email and devices for updates and tips on<br/>
        Soundwave's products and services, and for activities notifications.<br/>
      You can unsubscribe for free at any time in your notification<br/>
          settings.<br/><br/>

        We may use information you provide us in order to show you<br/>
      targeted ads as described in our Privacy Policy.</div>
      </form>
    </div>
    );
  }
}

export default connect(msp, mdp)(SignupForm);
