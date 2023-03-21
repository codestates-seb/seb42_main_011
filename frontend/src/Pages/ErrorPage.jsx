import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 300px);
`;

const ErrorText = styled.div`
  .error__red {
    font-family: var(--font-title) !important;
    color: var(--color-tertiary);
  }
  .error__black {
    font-family: var(--font-title) !important;
  }
  font-size: var(--font-size-50);
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: var(--font-size-20);
  font-weight: 700;
  margin-bottom: 16px;
`;

const Caption = styled.p`
  text-align: center;
  font-size: var(--font-size-16);
  white-space: pre-line;
  line-height: 37px;
`;

const CaptionText =
  '찾으려는 페이지의 주소가 잘못 입력되었거나,\n주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.\n입력하신 페이지의 주소가 정확한지 다시 한 번 확인해주세요.';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

function ErrorPage() {
  return (
    <FormContainer>
      <ErrorText>
        <span className="error__red">404&nbsp;</span>
        <span className="error__black">ERROR</span>
      </ErrorText>
      <Title>원하시는 페이지를 찾을 수 없습니다</Title>
      <Caption>{CaptionText}</Caption>
      <ButtonContainer>
        <Link to="/">
          <Button variant="large">홈으로 돌아가기</Button>
        </Link>
      </ButtonContainer>
    </FormContainer>
  );
}

export default ErrorPage;
