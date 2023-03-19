import { SET_MESSAGE, CLEAR_MESSAGE } from "./type";

function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message,
  }
};

function clearMessage() {
  return {
    type: CLEAR_MESSAGE,
  }
};

export { setMessage, clearMessage };