import { useMemo, useState } from 'react';
import ModalContext from '../../../context/ModalContext';
import ModalNonContent from './ModalNonContent';

function ModalProvider({ children }) {
  const [modals, setModals] = useState([]);

  const openModal = content => {
    setModals(prevStack => [...prevStack, content]);
  };

  const closeModal = () => {
    setModals(prevStack => prevStack.slice(0, -1));
  };

  const providerValue = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={providerValue}>
      {children}
      {modals.map((madal, index) => (
        <ModalNonContent key={`modal_${index}`}>{madal}</ModalNonContent>
      ))}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
