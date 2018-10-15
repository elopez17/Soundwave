import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'
import { signup, login } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import { receiveErrors, clearErrors } from '../../actions/session_actions';


const msp = (state) => ({
  errors: state.errors.session,
  formType: 'signup_username',
});

const mdp = (dispatch) => ({
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
    <div>
      <form>
        <label>Choose your display name*
          <input onChange={this.updateField('username')} type='text' value={this.state.username} />
        </label>
        {this.props.errors[0]}
        <button className="signin-form-btn" onClick={this.handleSubmit}>Get started</button>
      </form>
    </div>
    );
  }
}

export default withRouter(connect(msp, mdp)(SignupUsernameForm));
