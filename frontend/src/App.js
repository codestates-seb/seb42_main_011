import React from 'react';
import { Provider } from "react-redux";
import ModalProvider from './components/UI/Modal/ModalProvider';
import store from './redux/store';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyles';

// Create a client

function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <Router />
        <GlobalStyles />
      </ModalProvider>
    </Provider>

  );
}

export default App;
