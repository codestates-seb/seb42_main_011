import { createContext } from 'react';

export default createContext({
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
  closeAllModal: () => {},
});
