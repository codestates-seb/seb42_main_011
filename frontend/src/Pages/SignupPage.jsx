/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/UI/Input';
import DropdownGender from '../components/UI/Dropdown/DropdownGender';
import Button from '../components/UI/Button';
import { register } from '../redux/actions/auth';
import signupNullCheck from './SignupNullCheck';
import { emailVerify, nicknameVerify } from '../api/authApi';

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (min-height: 1050px) {
    height: 737px;
  }
`;

const Title = styled.h3`
  font-size: var(--font-size-24);
  font-weight: 500;
  margin: 20px 0;
`;

const SignupForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  @media screen and (min-width: 1174px) {
    align-items: center;
  }

  row-gap: 20px;
  margin-bottom: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

function SignupPage() {
  // 기능 구현
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogGender, setDogGender] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [nullErrors, setNullErrors] = useState({});
  const [errors, setErrors] = useState({
    nickname:"",
    email:"",
    password:"",
    passwordRetype:"",
    dogName:"",
  });

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const onChangePasswordRetype = (e) => {
    setPasswordRetype(e.target.value);
  }
  const onChangeDogName = (e) => {
    setDogName(e.target.value);
  }
  const onChangeDogGender = (selectedValue) => {
    setDogGender(selectedValue);
  }

  const checkLength = () => {
    if(nickname.length > 10){
      setErrors(prev => ({ ...prev, nickname: "닉네임은 10자 이하여야 합니다."}));
    }else{
      setErrors(prev => ({ ...prev, nickname:""}));
    }
    if(dogName.length > 10){
      setErrors(prev => ({ ...prev, dogName: "강아지 이름은 10자 이하여야 합니다."}));
    }else{
      setErrors(prev => ({ ...prev, dogName:""}));
    }
  };

  const passwordVerify = input => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/.test(input);
  const passwordRetypeVerify = (pw, pwRetype) => {
    if(pw !== pwRetype){
      setErrors(prev => ({ ...prev, passwordRetype: "비밀번호가 일치하지 않습니다."}))
    }else{
      setErrors(prev => ({ ...prev, passwordRetype: ""}))
    }
  }

  useEffect(() => {
    passwordRetypeVerify(password, passwordRetype);
  }, [password, passwordRetype])

  useEffect(() => {
    if(!passwordVerify(password) && password.length > 0){
      setErrors(prev => ({ ...prev, password: "비밀번호는 영문 대소문자와 숫자의 조합으로 8자 이상 20자 이하여야 합니다."}))
    }else{
      setErrors(prev => ({ ...prev, password:"" }))
    }
  }, [password])

  useEffect(() => {
    checkLength();
  }, [nickname, dogName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    setNullErrors(signupNullCheck({nickname, email, password, passwordRetype, dogName, dogGender}));
    
    // 빈칸 유효성 검사 통과했을 경우
    if(Object.keys(nullErrors).length === 0){
      dispatch(register(email, password, nickname, dogName, dogGender))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
    }

  }
  // console.log(useSelector(state => state));
  // console.log(successful);
  return (
    
        <FormContainer>
          <Title>회원가입</Title>
        {!successful && (
          <SignupForm onSubmit={handleSubmit}>
            <Input variant="large" label="닉네임" id="name" type="text" value={nickname} onChange={onChangeNickname} />
            {nullErrors.nickname && <p>{nullErrors.nickname}</p>}
            {errors.nickname && <p>{errors.nickname}</p>}
            <Input variant="large" label="이메일" id="email" type="email" value={email} onChange={onChangeEmail} />
            {nullErrors.email && <p>{nullErrors.email}</p>}
            <Input variant="large" label="비밀번호" id="password" type="password" value={password} onChange={onChangePassword} />
            {nullErrors.password && <p>{nullErrors.password}</p>}
            {errors.password && <p>{errors.password}</p>}
            <Input
              variant="large"
              label="비밀번호 확인"
              id="password-retype"
              type="password"
              value={passwordRetype} onChange={onChangePasswordRetype} />
            {nullErrors.passwordRetype && <p>{nullErrors.passwordRetype}</p>}
            {errors.passwordRetype && <p>{errors.passwordRetype}</p>}
            <Input variant="large" label="강아지 이름" id="dogname" type="text" value={dogName} onChange={onChangeDogName} />
            {nullErrors.dogName && <p>{nullErrors.dogName}</p>}
            {errors.dogName && <p>{errors.dogName}</p>}
            <DropdownGender onSelect={onChangeDogGender} />
            {nullErrors.dogGender && <p>{nullErrors.dogGender}</p>}
            <ButtonContainer>
              <Button variant="large">회원가입</Button>
            </ButtonContainer>
          </SignupForm>
        )}
        {message && (
          <div>{message}</div>
        )}
        </FormContainer>
    
  );
}

export default SignupPage;
