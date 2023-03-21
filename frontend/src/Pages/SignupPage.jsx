import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/UI/Input';
import DropdownGender from '../components/UI/Dropdown/DropdownGender';
import Button from '../components/UI/Button';
import { register } from '../redux/actions/auth';

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (min-height: 1050px){
    height: 737px;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const SignupForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  @media screen and (min-width: 1174px){
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

const gender = ['여자', '남자'];


function SignupPage() {
  // 기능 구현
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [successful, setSuccessful] = useState(false);

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
  const onChangeDogGender = (e) => {
    setDogGender(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessful(false);

    // 유효성검사 통과했을 경우 if문
    dispatch(register(email, password, nickname, dogName, dogGender))
    .then(() => {
      setSuccessful(true);
    })
    .catch(() => {
      setSuccessful(false);
    });
  }
  // console.log(useSelector(state => state));
  // console.log(successful);
  return (
    
      <FormContainer>
        <Title>회원가입</Title>
        {!successful && (
        <SignupForm onSubmit={handleSubmit}>
          <Input variant='large' label='닉네임' id='name' type='text' value={nickname} onChange={onChangeNickname} />
          <Input variant='large' label='이메일' id='email' type='email' value={email} onChange={onChangeEmail} />
          <Input variant='large' label='비밀번호' id='password' type='password' value={password} onChange={onChangePassword} />
          <Input variant='large' label='비밀번호 확인' id='password-retype' type='password' value={passwordRetype} onChange={onChangePasswordRetype} />
          <Input variant='large' label='강아지 이름' id='dogname' type='text' value={dogName} onChange={onChangeDogName} />
          <DropdownGender id="dropdown" options={gender} labelText="강아지 성별" value={dogGender} onChange={onChangeDogGender} />
          <ButtonContainer>
            <Button variant='large'>회원가입</Button>
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
