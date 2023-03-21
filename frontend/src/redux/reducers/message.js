/* eslint-disable default-param-last */
// message action이 디스패치되면 message 상태를 업데이트하는 리듀서.

import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/type";

const initialState = {};

export default function message(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}