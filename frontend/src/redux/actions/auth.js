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
  SET_MESSAGE,
} from './type';

import * as AuthService from '../services/auth.service';

function register(email, password, nickname, dogName, dogGender) {
  return function (dispatch) {
    AuthService.register(email, password, nickname, dogName, dogGender).then(
      response => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });

        return Promise.resolve();
      },

      error => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      },
    );
  };
}

// export const register =
//   (email, password, nickname, dogName, dogGender) => dispatch =>
//     AuthService.register(email, password, nickname, dogName, dogGender).then(
//       response => {
//         dispatch({
//           type: REGISTER_SUCCESS,
//         });

//         dispatch({
//           type: SET_MESSAGE,
//           payload: response.data.message,
//         });

//         return Promise.resolve();
//       },

//       error => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         dispatch({
//           type: REGISTER_FAIL,
//         });

//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });

//         return Promise.reject();
//       },
//     );

function login(email, password) {
  return function (dispatch) {
    AuthService.login(email, password).then(
      data => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },

      error => {
        let message = '';
        if (error.response.status === 401) {
          message = '등록되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.';
        } else {
          // message = (error.response &&
          //                 error.response.data &&
          //                 error.response.data.message) ||
          //               error.message ||
          //               error.toString();
          message =
            '일시적인 오류로 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';
          console.log(error.toString());
        }

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      },
    );
  };
}
// export const login = (email, password) => dispatch =>
//   AuthService.login(email, password).then(
//     data => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: { user: data },
//       });

//       return Promise.resolve();
//     },

//     error => {
//       let message = '';
//       if (error.response.status === 401) {
//         message = '등록되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.';
//       } else {
//         // message = (error.response &&
//         //                 error.response.data &&
//         //                 error.response.data.message) ||
//         //               error.message ||
//         //               error.toString();
//         message =
//           '일시적인 오류로 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';
//         console.log(error.toString());
//       }

//       dispatch({
//         type: LOGIN_FAIL,
//       });

//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });

//       return Promise.reject();
//     },
//   );

function logout() {
  return function (dispatch) {
    AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
  };
}

// export const logout = () => dispatch => {
// AuthService.logout();
// dispatch({
//   type: LOGOUT,
// });
// };

// export const resetPassword

export { register, login, logout };
