import React from 'react';
import styled from 'styled-components';
import mybuddyLogo from '../../assets/logo/logo_navy.svg';

const InfoCardWrapper = styled.div`
  width: 100%;
  height: 600px;
  background-color: var(--color-light-0);
  border-radius: 15px;
  padding: 40px 40px 0;

  @media screen and (max-width: 1199px) {
    height: 500px;
  }
`;

const InfoTitle = styled.h2`
  width: 230px;
`;

const InfoText = styled.p`
  margin-bottom: 30px;
`;

function InfoCard() {
  return (
    <InfoCardWrapper>
      <InfoTitle>
        <img src={mybuddyLogo} alt="마이버디 로고" />
      </InfoTitle>
      <InfoText>
        <span>대표</span> 강지은 | 강지후 | 정다운 | 정시원 | 정정수 | 왕지호
      </InfoText>
      <InfoText>
        <span>사업자 등록번호</span> 212-34-5678
      </InfoText>
      <InfoText>
        <span>TEL</span> 010-1234-5678
      </InfoText>
      <InfoText>
        <span>EMAIL</span> mybuddy.helpdesk@gmail.com
      </InfoText>
      <InfoText>
        <span>GITHUB</span> MY BUDDY
      </InfoText>
      <InfoText>Copyright 2023 MY BUDDY All rights reserved.</InfoText>
    </InfoCardWrapper>
  );
}

export default InfoCard;
