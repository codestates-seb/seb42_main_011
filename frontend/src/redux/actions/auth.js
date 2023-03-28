/* eslint-disable import/no-named-as-default-member */

// 인증과 관련된 actions 생성자.
// 결과에서 하나 이상의 dispatch를 트리거하는 비동기 HTTP 요청을 만들기 위해 AuthService를 import한다(?)

// register()
// AuthService.register(email, password, ...) 요청
// 성공 -> REGISTER_SUCCESS와 SET_MESSAGE를 dispatch(전달)함
// 실패 -> REGISTER_FAIL과 SET_MESSAGE를 dispatch(전달)함

// login()
// AuthService.login(email, password)를 요청
// 성공 -> LOGIN_SUCCESS와 SET_MESSAGE를 dispatch
// 실패 -> LOGIN_FAIL과 SET_MESSAGE를 dispatch

// 두 생성자 모두 이를 컴포넌트에 대한 Promise를 반환한다.
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './type';

import * as AuthService from '../services/auth.service';

const register = (email, password, nickname, dogName, dogGender) => dispatch =>
  AuthService.register(email, password, nickname, dogName, dogGender)
    .then(() => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      return Promise.resolve();
    })
    .catch(error => {
      dispatch({
        type: REGISTER_FAIL,
      });

      throw error;
    });

const login = (email, password) => dispatch =>
  AuthService.login(email, password)
    .then(data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    })
    .catch(error => {
      dispatch({
        type: LOGIN_FAIL,
      });

      throw error;
    });

const logout = () => dispatch => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export { register, login, logout };
