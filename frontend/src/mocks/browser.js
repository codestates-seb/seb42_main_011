// src/mocks/browser.js
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw';
// import handlers from './handlers';
import { logout, login, register } from '../redux/services/auth.service';
// This configures a Service Worker with the given request handlers.
// export default setupWorker(...handlers);
export default setupWorker(logout, login, register);
