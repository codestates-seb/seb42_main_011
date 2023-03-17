import { useMemo, useState } from 'react';
import ModalContext from '../../../context/ModalContext';

function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    console.log(1111);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const providerValue = useMemo(
    () => ({ showModal, openModal, closeModal }),
    [showModal],
  );

  return (
    <ModalContext.Provider value={providerValue}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
