/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
// import womanIcon from '../assets/icons/icon-woman.svg';
import Input from '../components/UI/Input';
import Dropdown from '../components/UI/Dropdown/Dropdown';
import Button from '../components/UI/Button';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  row-gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

const dogGender = ['여자', '남자'];

function SignupPage() {
  return (
  <FormContainer>
    <Title>회원가입</Title>
    <SignupForm>
      <Input variant='large' label='닉네임' id='name' type='text' flexGrow='1' />
      <Input variant='large' label='이메일' id='email' type='email' flexGrow='1' />
      <Input variant='large' label='비밀번호' id='password' type='password' flexGrow='1' />
      <Input variant='large' label='비밀번호 확인' id='password-retype' type='password' flexGrow='1' />
      <Input variant='large' label='강아지 이름' id='dogname' type='text' flexGrow='1' />
      <Dropdown id="dropdown" options={dogGender} labelText="강아지 성별" flexGrow='1' />
      <ButtonContainer>
        <Button variant='large'>회원가입</Button>
      </ButtonContainer>
    </SignupForm>
  </FormContainer>
  );
}

export default SignupPage;