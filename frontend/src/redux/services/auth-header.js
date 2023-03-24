/* eslint-disable import/no-extraneous-dependencies */
// 보호된 리소스에 접근할 때 HTTP 요청은 Authorization header가 필요하다.

// import Cookies from 'js-cookie';

// helper function authHeader
// 로컬스토리지 체크 -> JWT(accessToken)있는 로그인된 유저가 있으면 HTTP Authorization header를 반환한다. 그렇지 않으면 빈 객체를 반환한다.
export default function authHeader() {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  // const refreshToken = Cookies.get('refreshToken');

  if(accessToken){
    // springboot 사용시
    return { Authorization: `Bearer ${accessToken}` }; 
    // bearer: JWT 혹은 OAuth에 대한 토큰 사용시의 type

    // node express 사용시
    // return { 'x-access-token': user.accessToken };

  // eslint-disable-next-line no-else-return
  } else{
    return {};
  }
}