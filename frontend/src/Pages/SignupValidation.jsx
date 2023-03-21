/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */

// submit 이벤트가 일어나면 검사되는 코드
function SignupValidation(formData) {
  const errors = {};

  // 빈 칸
  for(const [key, value] of Object.entries(formData)) {
    if(!value || value.length === 0) {
      switch(key) {
        case "nickname":
          errors[key] = "닉네임은 필수 항목입니다.";
          break;
        case "email":
          errors[key] = "이메일은 필수 항목입니다.";
          break;
        case "password":
          errors[key] = "비밀번호는 필수 항목입니다.";
          break;
        case "passwordRetype":
          errors[key] = "비밀번호 확인은 필수 항목입니다.";
          break;
        case "dogName":
          errors[key] = "강아지 이름은 필수 항목입니다.";
          break;
        case "dogGender":
          errors[key] = "강아지 성별은 필수 항목입니다.";
          break;
        default:
      }
    }
  }

  // 견주 닉네임
  // if(formData.nickname.length > 10) {
  //   errors.nickname = "닉네임은 10자 이하여야 합니다."
  // }
    // 유니크
  
  
  // 이메일
    // 등록된 이메일(not unique)
  
  // 비밀번호
    // 영문자+숫자+특수문자의 조합으로 8자리 이상
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  // if(!passwordRegex.test(formData.password)){
  //   errors.password = "비밀번호는 영문자+숫자+특수문자의 조합으로 8자리 이상이어야 합니다."
  // }

  // 비밀번호 확인
    // 비밀번호와 동일
  // if(formData.password !== formData.passwordRetype) {
  //   errors.passwordRetype = "비밀번호가 일치하지 않습니다."
  // }

  // 강아지 이름
    // 10자 이하
  // if(formData.dogName.length > 10) {
  //   errors.dogName = "닉네임은 10자 이하여야 합니다."
  // }

  return errors;
}

export default SignupValidation