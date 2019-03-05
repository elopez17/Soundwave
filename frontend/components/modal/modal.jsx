import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { clearErrors } from '../../actions/session_actions';
import SigninForm from '../session_form/signin_container';
import SigninPasswordForm from '../session_form/signin_password_container';
import SignupForm from '../session_form/signup_container';
import SignupPasswordForm from '../session_form/signup_password_container';
import SignupPersonalForm from '../session_form/signup_personal_container';
import SignupUsernameForm from '../session_form/signup_username_container';

const mapStateToProps = (state) => ({
  modal: state.ui.modal,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  clearErrors: () => dispatch(clearErrors()),
});

const Modal = ({ modal, closeModal, clearErrors }) => {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.form) {
    case 'signin':
      component = <SigninForm email={modal.email}/>
      break;
    case 'signin_password':
      component = <SigninPasswordForm email={modal.email}/>
      break;
    case 'signup':
      component = <SignupForm email={modal.email}/>
      break;
    case 'signup_password':
      component = <SignupPasswordForm email={modal.email}/>
      break;
    case 'signup_personal':
      component = <SignupPersonalForm email={modal.email} password={modal.password}/>
      break;
    case 'signup_username':
      component = <SignupUsernameForm email={modal.email} password={modal.password}/>
      break;
    default:
      return null;
  }
  return (
    <div className='modal-background' onClick={() => {
        closeModal();
        clearErrors();
      }}>
      <div className='modal-child' onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
