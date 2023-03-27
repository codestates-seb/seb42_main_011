/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable default-param-last */
// isLoggedIn과 user 상태를 업데이트하는 리듀서

import jwtDecode from 'jwt-decode';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_ACCESS_TOKEN,
} from '../actions/type';

const accessToken = JSON.parse(localStorage.getItem('accessToken'));
const user = accessToken
  ? jwtDecode(localStorage.getItem('accessToken')).memberId
  : null;

const initialState = accessToken
  ? { isLoggedIn: true, user, accessToken }
  : { isLoggedIn: false, user: null, accessToken: null };

function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload,
      };
    default:
      return state;
  }
}

export default auth;
