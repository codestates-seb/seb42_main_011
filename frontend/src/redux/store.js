import { createStore, applyMiddleware, combineReducers } from "redux";
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
);

export default store;