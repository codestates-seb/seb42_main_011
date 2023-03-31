import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../UI/Button';

const ColorLargeCardWrapper = styled.div`
  width: 100%;
  height: 350px;
  background-color: var(--color-secondary);
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 40px 40px 0;
  text-align: center;

  @media screen and (max-width: 1199px) {
    height: 250px;
  }
`;

const InfoTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 70px;
  margin: 30px 0 40px;
  font-weight: normal;
  color: var(--color-dark-0);

  & span {
    font-family: var(--font-title);
    color: var(--color-light-0);
  }

  @media screen and (max-width: 1199px) {
    font-size: 50px;
    margin: 0 0 25px;
  }
`;

const InfoText = styled.p`
  margin-bottom: 40px;
  font-size: var(--font-size-20);
  font-weight: 500;
  @media screen and (max-width: 1199px) {
    margin-bottom: 30px;
  }
`;

const Signup = styled(Button)`
  &:hover {
    background-color: var(--color-tertiary);
  }
`;

function ColorLargeCard() {
  return (
    <ColorLargeCardWrapper>
      <InfoTitle>
        🐶 why not <span>mybuddy</span>?! 🐶
      </InfoTitle>
      <InfoText>
        귀엽고 소중한 우리 강아지! 마이버디에서 일상 공유/자랑하고 다양한
        멍친구들도 만나보세요!
      </InfoText>
      <Link to="/signup">
        <Signup variant="large">회원가입 하러가기</Signup>
      </Link>
    </ColorLargeCardWrapper>
  );
}

export default ColorLargeCard;
