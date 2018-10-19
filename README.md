# Fullstack-project

Soundwave is a music streaming app in which users can publish songs.

[Soundwave Heroku](https://soundwave-app.herokuapp.com/?#/)

Technologies involved:
---
* react-redux
* ruby on rails
* postgresql
* html/css

### login and sign-up forms
---
The forms for logging in and signing up were implemented through modals. In each of these forms, there are multiple modals to be rendered one after another. Although there are many modals to be rendered, only one modal component was created to avoid repeating code. This modal component is responsible for showing the correct form. To accomplish this, the modal component is given a slice of state from the redux store which contains the form type to be rendered.
```js
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
```
