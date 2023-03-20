import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { login } from "../redux/actions/auth";

// 스타일
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

  // 기능구현
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const { message } = useSelector((state) => state.messageReducer);

  const dispatch = useDispatch();

  const validateEmail = () => {
    if(!email) {
      setEmailError("이메일을 입력하세요.");
      return false;
    }
    setEmailError("");
    return true;
  }

  const validatePassword = () => {
    if(!password) {
      setPasswordError("비밀번호를 입력하세요.");
      return false;
    }
    setPasswordError("");
    return true;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      setLoading(true);

      // dispatch(login(email, password))
      login(email, password)(dispatch)
      .then(() => {
        navigate("/friendpage/feed");
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      })
    }
  }

  if(isLoggedIn) {
    return <Navigate to="/friendpage/feed" />;
  }

  return (
    <FormContainer>
      <Link to="/signup"><SignupLink>회원가입</SignupLink></Link>
      <Title>로그인</Title>
      <LoginForm onSubmit={handleLogin}>
        <Input variant='regular' label='이메일' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && (
          <div>
            {emailError}
          </div>
        )}
        <PasswordContainer>
          <Input variant='regular' label='비밀번호' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && (
            <div>
              {passwordError}
            </div>
          )}
          <Link to="/password/find"><ForgotPassword>비밀번호를 잊어버렸나요?</ForgotPassword></Link>
        </PasswordContainer>
        <ButtonContainer>
          <Button variant='large' disabled={loading}>
            {/* 로딩 시 여기에 spinner 추가할지? */}
            로그인
          </Button>
        </ButtonContainer>
        {message && (
          <div>
            {message}
          </div>
        )}
      </LoginForm>
    </FormContainer>
  );
}

export default LoginPage;
