import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import { closeModal, openModal } from '../../actions/modal_actions';
import { receiveErrors, clearErrors } from '../../actions/session_actions';


const msp = (state) => ({
  errors: state.errors.session,
  formType: 'signup_personal',
});

const mdp = (dispatch) => ({
  openModal: (payload) => dispatch(openModal(payload)),
  closeModal: () => dispatch(closeModal()),
  receiveErrors: (errors) => dispatch(receiveErrors(errors)),
  clearErrors: () => dispatch(clearErrors()),
});

class SignupPersonalForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: props.email,
      password: props.password,
      age: '',
      gender: '',
    };
    this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field){
    return (e) => {
      let value;
      if (field === 'age') {
        value = parseInt(e.target.value, 10);
        if (isNaN(value)) {
          value = 0;
        }
      } else {
        value = e.target.value;
      }
      this.setState({
      [field]: value
      });
    };
  }

  handleSubmit(){
    if (this.state.age < 13) {
      this.props.receiveErrors(['Sorry, but you don\'t meet Soundwave\'s minimum age requirements']);
      this.props.openModal({
        email: this.state.email,
        modal: 'signup_personal',
        password: this.state.password,
      });
      return -1;
    } else {
      this.props.clearErrors();
      this.props.openModal({
        email: this.state.email,
        modal: 'signup_username',
        password: this.state.password,
      });
    }
  }

  render(){
    return (
  <form className="personal-form">
    <h1 className="personal-header">Create your Soundwave<br/>account</h1>
    <div className="age-title">Tell us your age<span className="color-orange">*</span></div>
    <input className="personal-age-inp" onChange={this.updateField('age')} type='text' value={this.state.age.toString()} />
    <div className="personal-age-errors">{this.props.errors[0]}</div>
    <div className="gender-title">Gender<span className="color-orange">*</span></div>
    <input className="personal-gender-inp" onChange={this.updateField('gender')} type='text' value={this.state.gender} placeholder="Indicate your gender" />
    <button className="personal-form-btn continue-btn" onClick={this.handleSubmit}>Continue</button>
  </form>
    );
  }
}

export default withRouter(connect(msp, mdp)(SignupPersonalForm));
