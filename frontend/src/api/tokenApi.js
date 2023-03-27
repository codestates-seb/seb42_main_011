import axios from 'axios';
import jwtDecode from 'jwt-decode';
// eslint-disable-next-line import/no-cycle
import authHeader from '../redux/services/auth-header';

// 로그인 만료(액세스 토큰 기한 만료) & 페이지 새로고침시
// refresh토큰으로 액세스토큰 다시 발급

const JWT_EXPIRY_TIME = 2 * 60 * 1000;
// 2-1. onSilentRefresh() : /refresh로 POST 요청 -> onLoginSuccess 실행

const onSilentRefresh = () => {
  axios
    .post(`/api/v1/auth/refresh`, null, {
      headers: authHeader(),
      'ngrok-skip-browser-warning': '12',
      withCredentials: true,
    })
    // eslint-disable-next-line no-use-before-define
    .then(onLoginSuccess)
    .catch(error => error);
};

// 2-2. onLoginSuccess(response)
// 로그인 성공시 액세스토큰을 로컬스토리지에 저장
// 액세스토큰 만료시간 1분 전에 로그인을 연장

// const onLoginSuccess = response => {
//   setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000); // 만료 1분 전 refresh함수 실행
//   const accessToken = JSON.stringify(
//     response.headers.authorization.split(' ')[1],
//   );
//   localStorage.setItem('accessToken', accessToken);
//   try {
//     const user = jwtDecode(accessToken);
//     return user.memberId;
//   } catch (error) {
//     console.log(error);
//   }
// };

const onLoginSuccess = response => {
  setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  const accessToken = JSON.stringify(
    response.headers.authorization.split(' ')[1],
  );

  try {
    const user = jwtDecode(accessToken);
    return user.memberId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { onSilentRefresh, onLoginSuccess };
