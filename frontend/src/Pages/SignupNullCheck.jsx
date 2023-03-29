/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */

// import axios from "axios";

// submit 이벤트가 일어나면 검사되는 코드
function SignupNullCheck(formData) {
  const errors = {};

  // 빈 칸
  for (const [key, value] of Object.entries(formData)) {
    if (!value || value.length === 0) {
      switch (key) {
        case 'nickname':
          errors[key] = '닉네임은 필수 항목입니다.';
          break;
        case 'email':
          errors[key] = '이메일은 필수 항목입니다.';
          break;
        case 'password':
          errors[key] = '비밀번호는 필수 항목입니다.';
          break;
        case 'passwordRetype':
          errors[key] = '비밀번호 확인은 필수 항목입니다.';
          break;
        case 'dogName':
          errors[key] = '강아지 이름은 필수 항목입니다.';
          break;
        case 'dogGender':
          errors[key] = '강아지 성별은 필수 항목입니다.';
          break;
        default:
      }
    }
  }

  return errors;
}

export default SignupNullCheck;
