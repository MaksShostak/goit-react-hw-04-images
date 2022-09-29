import { useEffect } from 'react';
import PropTypes from 'prop-types';

import style from './Modal.module.css';

const Modal = ({ modalClose, modalimg }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        modalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalClose]);

  const handleBackDropClose = event => {
    if (event.currentTarget === event.target) {
      modalClose();
    }
  };

  return (
    <div className={style.overlay} onClick={handleBackDropClose}>
      <div className={style.modal}>
        <img src={modalimg.largeImageURL} alt={modalimg.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalClose: PropTypes.func.isRequired,
  modalimg: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;
