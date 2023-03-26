/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { resetPassword } from '../api/authApi';

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: var(--font-size-24);
  font-weight: 500;
  margin: 119px 0 40px;
`;

const Caption = styled.p`
  font-size: var(--font-size-16);
  white-space: pre-line;
  color: var(--color-tertiary);
  font-weight: 700;
  line-height: 40px;
  align-self: flex-start;
`;

const CaptionText = '새로운 비밀번호를 입력해주세요.';

const ResetForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 100px;
`;

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handlePasswordRetypeChange = e => {
    setPasswordRetype(e.target.value);
  };

  const token = new URLSearchParams(window.location.search).get('token');

  const tokenDecoded = jwtDecode(token);
  const email = tokenDecoded.username;

  const passwordVerify = input =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/.test(input);

  const passwordRetypeVerify = (pw, pwRetype) => {
    if (pw !== pwRetype) {
      setErrors(prev => ({
        ...prev,
        passwordRetype: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors(prev => ({ ...prev, passwordRetype: '' }));
    }
  };

  useEffect(() => {
    passwordRetypeVerify(password, passwordRetype);
  }, [password, passwordRetype]);

  useEffect(() => {
    if (!passwordVerify(password) && password.length > 0) {
      setErrors(prev => ({
        ...prev,
        password:
          '비밀번호는 영문 대소문자와 숫자의 조합으로 8자 이상 20자 이하여야 합니다.',
      }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  }, [password]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (passwordVerify(password) && password === passwordRetype) {
      await resetPassword(token, email, password)
        .then(() => {
          setTimeout(navigate('/login'), 1000);
        })
        .catch(error => console.log(error));
    } else {
      alert('입력하신 비밀번호를 다시 확인해주세요.');
    }
  };

  return (
    <FormContainer>
      <Title>비밀번호 변경하기</Title>
      <ResetForm onSubmit={handleSubmit}>
        <Caption>{CaptionText}</Caption>
        <Input
          variant="regular"
          label="비밀번호"
          id="password"
          type="password"
          onChange={handlePasswordChange}
        />
        {errors.password && <p>{errors.password}</p>}
        <Input
          variant="regular"
          label="비밀번호 확인"
          id="password-retype"
          type="password"
          onChange={handlePasswordRetypeChange}
        />
        {errors.passwordRetype && <p>{errors.passwordRetype}</p>}
        <ButtonContainer>
          <Button variant="large">비밀번호 변경</Button>
        </ButtonContainer>
      </ResetForm>
    </FormContainer>
  );
}

export default ResetPasswordPage;
