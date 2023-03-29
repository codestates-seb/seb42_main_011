import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

function useModal() {
  const { closeModal, openModal, showModal, closeAllModal, closeModalByIndex } =
    useContext(ModalContext);

  return { openModal, closeModal, showModal, closeAllModal, closeModalByIndex };
}

export default useModal;
