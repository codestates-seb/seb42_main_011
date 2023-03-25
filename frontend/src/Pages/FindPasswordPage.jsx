import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { sendEmail } from '../api/authApi';

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: var(--font-size-24);
  font-weight: 500;
  margin-bottom: 40px;
  margin-top: 70px;
`;

const Caption = styled.p`
  font-size: var(--font-size-16);
  white-space: pre-line;
  color: var(--color-tertiary);
  font-weight: 700;
  line-height: 40px;
  width: 100%;
`;

const CaptionText =
  '회원가입 시 작성한 이메일을 입력해주세요.\n이메일로 비밀번호를 변경할 수 있는 링크를 보내드립니다.';

const FindForm = styled.form`
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

function FindPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setEmail(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    sendEmail(email)
      .then(() => {
        alert('이메일이 전송되었습니다.');
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
        alert('다시 시도해주세요.');
      });
  };

  return (
    <FormContainer>
      <Title>비밀번호 찾기</Title>
      <FindForm onSubmit={handleSubmit}>
        <Caption>{CaptionText}</Caption>
        <Input
          variant="regular"
          label="이메일"
          id="email"
          type="email"
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button variant="large">이메일 전송</Button>
        </ButtonContainer>
      </FindForm>
    </FormContainer>
  );
}

export default FindPasswordPage;
