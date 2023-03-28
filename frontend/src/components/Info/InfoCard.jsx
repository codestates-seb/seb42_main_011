import React from 'react';
import styled from 'styled-components';

const InfoCardWrapper = styled.div`
  width: 100%;
  height: 600px;
  background-color: var(--color-light-0);
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 40px 40px 0;

  @media screen and (max-width: 1199px) {
    height: 500px;
  }
`;

const InfoTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 50px;
  margin-bottom: 20px;
  font-weight: normal;
`;

const InfoText = styled.p`
  margin-bottom: 30px;
`;

function InfoCard() {
  return (
    <InfoCardWrapper>
      <InfoTitle>Title Here</InfoTitle>
      <InfoText>
        마이버디는 어쩌구 저쩌구 솰라솰라 <br />
        마이버디는 어쩌구 저쩌구 솰라솰라 <br />
        마이버디는 어쩌구 저쩌구 솰라솰라 <br />
        여기다가 우리 정보 넣어도 좋을 듯 하다 <br />
        우리 아바타...? 강아지...? 맥 아바타...? 넣어도... <br />
        이메일 깃허브 등등 <br />
      </InfoText>
    </InfoCardWrapper>
  );
}

export default InfoCard;
