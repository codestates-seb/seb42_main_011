import React, { Fragment } from 'react';
import Router from './Router';

import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <Fragment>
      <Router />
      <GlobalStyles />
    </Fragment>
  );
}

export default App;
