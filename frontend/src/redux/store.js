/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, applyMiddleware } from "redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import rootReducer from "./reducers";
import authReducer from "./reducers/auth";
import messageReducer from "./reducers/message";

const rootReducer = combineReducers({
  authReducer,
  messageReducer,
})

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;