/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { login } from '../redux/actions/auth';
import useModal from '../hooks/useModal';
import ModalBase from '../components/UI/Modal/ModalBase';

// 스타일
const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const SignupLink = styled.button.attrs({
  type: 'button',
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

const ForgotPassword = styled.button.attrs({
  type: 'button',
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

const ErrorMessage = styled.p`
  color: var(--color-tertiary);
  font-size: 0.867rem;
  padding-left: 2px;
  padding-top: 4px;
`;

function LoginPage() {
  // 기능구현
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const { openModal, closeModal } = useModal();

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(email, password))
      .then(() => navigate('/'))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          setError('등록되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.');
        } else {
          openModal(
            <ModalBase
              title="실패"
              content="일시적인 오류로 로그인에 실패했습니다. 잠시 후 다시 시도해주세요."
              buttons={<Button onClick={closeModal}>확인</Button>}
            />,
          );
        }
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <FormContainer>
      <Link to="/signup">
        <SignupLink>회원가입</SignupLink>
      </Link>
      <Title>로그인</Title>
      <LoginForm onSubmit={handleLogin}>
        <Input
          required
          variant="regular"
          label="이메일"
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordContainer>
          <Input
            required
            variant="regular"
            label="비밀번호"
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Link to="/password/find">
            <ForgotPassword>비밀번호를 잊어버렸나요?</ForgotPassword>
          </Link>
        </PasswordContainer>{' '}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer>
          <Button variant="large" disabled={loading}>
            {/* 로딩 시 여기에 spinner 추가할지? */}
            로그인
          </Button>
        </ButtonContainer>
      </LoginForm>
    </FormContainer>
  );
}

export default LoginPage;
