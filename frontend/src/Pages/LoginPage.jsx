import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';


const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const SignupLink = styled.button.attrs({
  type: "button",
})`
  position: absolute;
  font-size: var(--font-size-20);
  top: -50px;
  right: 10px;
  border-bottom: 1px solid var(--color-dark-0);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 60px;
  margin-top: 70px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
`;

const ForgotPassword = styled.button.attrs({
  type: "button",
})`
  text-decoration: none;
  font-size: var(--font-size-13);
  opacity: 50%;
  position: absolute;
  right: 0;
  padding-top: 8px;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 100px;
`;

function LoginPage() {
  return (
    <FormContainer>
      <Link to="/signup"><SignupLink>회원가입</SignupLink></Link>
      <Title>로그인</Title>
      <LoginForm>
        <Input variant='regular' label='이메일' id='email' type='email' />
        <PasswordContainer>
          <Input variant='regular' label='비밀번호' id='password' type='password' />
          <Link to="/password/find"><ForgotPassword>비밀번호를 잊어버렸나요?</ForgotPassword></Link>
        </PasswordContainer>
        <ButtonContainer>
          <Button variant='large'>로그인</Button>
        </ButtonContainer>
      </LoginForm>
    </FormContainer>
  );
}

export default LoginPage;
