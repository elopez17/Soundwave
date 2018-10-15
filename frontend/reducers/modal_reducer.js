import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modal_actions';

const modalReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      return {
        form: action.modal,
        email: action.email,
        password: (action.password ? (action.password) : '')};
    case CLOSE_MODAL:
      return null;
    default:
      return null;
  }
};

export default modalReducer;
