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
      <h3>Sign up</h3>
      <form>
        <label>email:
          <input onChange={this.updateField('email')} type='text' value={this.state.email} placeholder="Your email address"/>
        </label>
        {this.props.errors[0]}
        <button className="continue-btn" onClick={this.handleSubmit}>Continue</button>
      </form>
    </div>
    );
  }
}

export default connect(msp, mdp)(SignupForm);
