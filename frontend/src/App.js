import React from 'react';
import ModalProvider from './components/UI/Modal/ModalProvider';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyles';

// Create a client

function App() {
  return (
    <ModalProvider>
      <Router />
      <GlobalStyles />
    </ModalProvider>
  );
}

export default App;
