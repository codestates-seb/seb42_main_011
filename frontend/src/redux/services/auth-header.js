// 보호된 리소스에 접근할 때 HTTP 요청은 Authorization header가 필요하다.

// helper function authHeader
// 로컬스토리지 체크 -> JWT(accessToken)있는 로그인된 유저가 있으면 HTTP Authorization header를 반환한다. 그렇지 않으면 빈 객체를 반환한다.
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.accessToken){
    return { Authorization: `Bearer ${user.accessToken}` }; // bearer: JWT 혹은 OAuth에 대한 토큰 사용시의 type
  } 
  return {};
  
}