import { connect } from 'react-redux';
import Homepage from './homepage';
import { openModal } from '../../actions/modal_actions';
import { login } from '../../actions/session_actions';

const msp = (state) => ({});

const mdp = (dispatch) => ({
  openModal: (payload) => dispatch(openModal(payload)),
  login: (user) => dispatch(login(user)),
});

export default connect(msp, mdp)(Homepage);
