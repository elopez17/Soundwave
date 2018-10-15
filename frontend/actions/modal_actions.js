export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (payload) => ({
  type: OPEN_MODAL,
  modal: payload.modal,
  email: payload.email,
  password: (payload.password ? (payload.password) : ''),
});

export const closeModal = (modal) => ({
  type: CLOSE_MODAL
});
