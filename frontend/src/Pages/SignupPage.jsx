/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import DropdownGender from '../components/UI/Dropdown/DropdownGender';
import Button from '../components/UI/Button';
import { register } from '../redux/actions/auth';
import signupNullCheck from './SignupNullCheck';
import { emailVerify, nicknameVerify } from '../api/authApi';
import useInputs from '../hooks/useInputs';
import useModal from '../hooks/useModal';
import ModalBase from '../components/UI/Modal/ModalBase';

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
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { isLoggedIn } = useSelector(state => state.auth);
  const [form, onChange, reset] = useInputs({
    nickname: '',
    email: '',
    password: '',
    passwordRetype: '',
    dogName: '',
  });
  const [dogGender, setDogGender] = useState('');
  const onChangeDogGender = selectedValue => {
    setDogGender(selectedValue);
  };

  const [nullErrors, setNullErrors] = useState({});
  const [errors, setErrors] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordRetype: '',
    dogName: '',
  });
  const [exists, setExists] = useState({});

  const dispatch = useDispatch();

  const checkLength = () => {
    if (form.nickname.length > 10) {
      setErrors(prev => ({
        ...prev,
        nickname: '닉네임은 10자 이하여야 합니다.',
      }));
    } else {
      setErrors(prev => ({ ...prev, nickname: '' }));
    }
    if (form.dogName.length > 10) {
      setErrors(prev => ({
        ...prev,
        dogName: '강아지 이름은 10자 이하여야 합니다.',
      }));
    } else {
      setErrors(prev => ({ ...prev, dogName: '' }));
    }
  };

  const passwordVerify = input =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/.test(input);
  const passwordRetypeVerify = (password, passwordRetype) => {
    if (password !== passwordRetype) {
      setErrors(prev => ({
        ...prev,
        passwordRetype: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors(prev => ({ ...prev, passwordRetype: '' }));
    }
  };

  useEffect(() => {
    passwordRetypeVerify(form.password, form.passwordRetype);
  }, [form.password, form.passwordRetype]);

  useEffect(() => {
    if (!passwordVerify(form.password) && form.password.length > 0) {
      setErrors(prev => ({
        ...prev,
        password:
          '비밀번호는 영문 대소문자와 숫자의 조합으로 8자 이상 20자 이하여야 합니다.',
      }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  }, [form.password]);

  useEffect(() => {
    checkLength();
  }, [form.nickname, form.dogName]);

  useEffect(() => {
    emailVerify(form.email)
      .then(
        setExists(prev => ({
          ...prev,
          email: '',
        })),
      )
      .catch(error => {
        if (error.response.status === 409) {
          setExists(prev => ({
            ...prev,
            email: '이미 사용중인 이메일입니다.',
          }));
        } else {
          setExists(prev => ({
            ...prev,
            email: '일시적인 오류가 발생했습니다.',
          }));
          console.log(error);
        }
      });

    nicknameVerify(form.nickname)
      .then(() => {
        setExists(prev => ({
          ...prev,
          nickname: '',
        }));
      })
      .catch(error => {
        if (error.response.status === 409) {
          setExists(prev => ({
            ...prev,
            nickname: '이미 사용중인 닉네임입니다.',
          }));
        } else {
          setExists(prev => ({
            ...prev,
            nickname: '일시적인 오류가 발생했습니다.',
          }));
          console.log(error);
        }
      });
  }, [form.email, form.nickname]);

  const handleSubmit = e => {
    e.preventDefault();
    setNullErrors(
      signupNullCheck({
        nickname: form.nickname,
        email: form.email,
        password: form.password,
        passwordRetype: form.passwordRetype,
        dogName: form.dogName,
        dogGender,
      }),
    );

    // 빈칸 유효성 검사 통과했을 경우
    if (Object.keys(nullErrors).length === 0) {
      dispatch(
        register(
          form.email,
          form.password,
          form.nickname,
          form.dogName,
          dogGender,
        ),
      )
        .then(() => {
          openModal(
            <ModalBase
              title="가입이 완료되었습니다."
              content="마이버디에 오신 것을 환영합니다!"
              buttons={<Button onClick={closeModal}>확인</Button>}
            />,
          );
          navigate('/login');
        })
        .catch(() => {});
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <FormContainer>
      <Title>회원가입</Title>

      <SignupForm onSubmit={handleSubmit}>
        <Input
          variant="large"
          label="닉네임"
          id="nickname"
          name="nickname"
          type="text"
          onBlur={onChange}
        >
          {[nullErrors.nickname, errors.nickname, exists.nickname]}
        </Input>

        <Input
          variant="large"
          label="이메일"
          id="email"
          name="email"
          type="email"
          onBlur={onChange}
        >
          {[nullErrors.email, exists.email]}
        </Input>

        <Input
          variant="large"
          label="비밀번호"
          id="password"
          name="password"
          type="password"
          onBlur={onChange}
        >
          {[nullErrors.password, errors.password]}
        </Input>

        <Input
          variant="large"
          label="비밀번호 확인"
          id="password-retype"
          name="passwordRetype"
          type="password"
          onBlur={onChange}
        >
          {[nullErrors.passwordRetype, errors.passwordRetype]}
        </Input>

        <Input
          variant="large"
          label="강아지 이름"
          id="dogName"
          name="dogName"
          type="text"
          onBlur={onChange}
        >
          {[nullErrors.dogName, errors.dogName]}
        </Input>

        <DropdownGender onSelect={onChangeDogGender}>
          {[nullErrors.dogGender]}
        </DropdownGender>

        <ButtonContainer>
          <Button variant="large">회원가입</Button>
        </ButtonContainer>
      </SignupForm>
    </FormContainer>
  );
}

export default SignupPage;
