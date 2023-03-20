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
  return (
    <FormContainer>
      <Title>비밀번호 찾기</Title>
      <FindForm>
        <Caption>{CaptionText}</Caption>
        <Input variant="regular" label="이메일" id="email" type="email" />
        <ButtonContainer>
          <Button variant="large">이메일 전송</Button>
        </ButtonContainer>
      </FindForm>
    </FormContainer>
  );
}

export default FindPasswordPage;
