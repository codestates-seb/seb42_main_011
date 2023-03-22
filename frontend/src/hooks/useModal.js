import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

function useModal() {
  const { closeModal, openModal, showModal } = useContext(ModalContext);

  return { openModal, closeModal, showModal };
}

export default useModal;
