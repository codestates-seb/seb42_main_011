import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

function useModal() {
  const { closeModal, openModal, showModal, closeAllModal } =
    useContext(ModalContext);

  return { openModal, closeModal, showModal, closeAllModal };
}

export default useModal;
