// redux 앱에는 store가 하나밖에 없기 때문에, reducer composition을 사용해 데이터 핸들링 로직을 분리한다.

import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";

export default combineReducers({
  auth,
  message,
});