import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

function useModal() {
  const { closeModal, openModal, showModal, closeAllModal, closeModalbyIndex } =
    useContext(ModalContext);

  return { openModal, closeModal, showModal, closeAllModal, closeModalbyIndex };
}

export default useModal;
