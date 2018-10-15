import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import { closeModal, openModal } from '../../actions/modal_actions';
import { receiveErrors, clearErrors } from '../../actions/session_actions';


const msp = (state) => ({
  errors: state.errors.session,
  formType: 'signup_password',
});

const mdp = (dispatch) => ({
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
    <div>
      <form>
        <input readOnly onClick={() => this.props.openModal({ email: this.state.email, modal: 'signup' })} type='text' value={this.state.email} />
        <label>Choose a password*
          <input onChange={this.updateField('password')} type='password' value={this.state.password} />
        </label>
        {this.props.errors[0]}
        <button className="signin-form-btn" onClick={this.handleSubmit}>Accept & continue</button>
      </form>
    </div>
    );
  }
}

export default withRouter(connect(msp, mdp)(SignupPasswordForm));
