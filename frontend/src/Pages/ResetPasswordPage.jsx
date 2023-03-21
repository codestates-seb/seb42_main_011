import React from 'react';
import styled from 'styled-components';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

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
  return (
    <FormContainer>
      <Title>비밀번호 변경하기</Title>
      <ResetForm>
        <Caption>{CaptionText}</Caption>
        <Input
          variant="regular"
          label="비밀번호"
          id="password"
          type="password"
        />
        <Input
          variant="regular"
          label="비밀번호 확인"
          id="password-retype"
          type="password"
        />
        <ButtonContainer>
          <Button variant="large">비밀번호 변경</Button>
        </ButtonContainer>
      </ResetForm>
    </FormContainer>
  );
}

export default ResetPasswordPage;
