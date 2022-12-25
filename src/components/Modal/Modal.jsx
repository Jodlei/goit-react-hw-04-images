import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';

const modalRoot = document.querySelector('#image-modal-root');

export const Modal = ({ toggleModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const closeModal = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
