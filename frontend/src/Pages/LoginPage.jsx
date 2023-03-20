import React from 'react';
import styled from 'styled-components';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const SignupLink = styled.a.attrs({
  href: '/signup',
})`
  position: absolute;
  top: -50px;
  right: 10px;
  font-size: var(--font-size-20);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 5px;
  &:hover {
    color: var(--color-tertiary);
  }
`;

const Title = styled.h3`
  font-size: var(--font-size-24);
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

const ForgotPassword = styled.a.attrs({
  href: '/password/find',
})`
  text-decoration: none;
  font-size: var(--font-size-13);
  opacity: 50%;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    color: var(--color-tertiary);
    opacity: 100%;
  }
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
      <SignupLink>회원가입</SignupLink>
      <Title>로그인</Title>
      <LoginForm>
        <Input variant="regular" label="이메일" id="email" type="email" />
        <PasswordContainer>
          <Input
            variant="regular"
            label="비밀번호"
            id="password"
            type="password"
          />
          <ForgotPassword>비밀번호를 잊어버렸나요?</ForgotPassword>
        </PasswordContainer>
        <ButtonContainer>
          <Button variant="large">로그인</Button>
        </ButtonContainer>
      </LoginForm>
    </FormContainer>
  );
}

export default LoginPage;
