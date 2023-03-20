import React from 'react';
import ModalProvider from './components/UI/Modal/ModalProvider';
import store from './redux/store';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyles';

// Create a client

function App() {
  return (
    <ModalProvider store={store}>
      <Router />
      <GlobalStyles />
    </ModalProvider>
  );
}

export default App;
