import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ModalProvider from './components/UI/Modal/ModalProvider';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyles';
import { onSilentRefresh } from './api/tokenApi';

const queryClient = new QueryClient();

function App() {
  if (localStorage.getItem('accessToken')) {
    useEffect(() => {
      onSilentRefresh();
    }, []);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Router />
        <GlobalStyles />
      </ModalProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
