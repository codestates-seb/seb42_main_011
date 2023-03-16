/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
// import womanIcon from '../assets/icons/icon-woman.svg';
import Input from '../components/UI/Input';
import DropdownGender from '../components/UI/Dropdown/DropdownGender';
import Button from '../components/UI/Button';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* min-height: 647px; */
  @media screen and (min-height: 1050px){
    height: 737px;
  }
  /* min-width: 100px; */
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
  margin-top: 10px;
`;

const dogGender = ['여자', '남자'];

function SignupPage() {
  return (
  <FormContainer>
    <Title>회원가입</Title>
    <SignupForm>
      <Input variant='large' label='닉네임' id='name' type='text' />
      <Input variant='large' label='이메일' id='email' type='email' />
      <Input variant='large' label='비밀번호' id='password' type='password' />
      <Input variant='large' label='비밀번호 확인' id='password-retype' type='password' />
      <Input variant='large' label='강아지 이름' id='dogname' type='text' />
      <DropdownGender id="dropdown" options={dogGender} labelText="강아지 성별" />
      <ButtonContainer>
        <Button variant='large'>회원가입</Button>
      </ButtonContainer>
    </SignupForm>
  </FormContainer>
  );
}

export default SignupPage;
