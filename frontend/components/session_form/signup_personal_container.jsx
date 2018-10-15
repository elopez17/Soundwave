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
      this.setState({
      [field]: (field === 'age' ? parseInt(e.target.value === '' ? '0' : e.target.value, 10) : e.target.value)
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
    <div>
      <form>
        <label>Tell us your age*
          <input onChange={this.updateField('age')} type='text' value={this.state.age.toString()} />
        </label>
        {this.props.errors[0]}
        <label>Gender
          <input onChange={this.updateField('gender')} type='text' value={this.state.gender} placeholder="Indicate your gender" />
        </label>
        <button className="signin-form-btn" onClick={this.handleSubmit}>Continue</button>
      </form>
    </div>
    );
  }
}

export default withRouter(connect(msp, mdp)(SignupPersonalForm));
