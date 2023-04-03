import React from 'react';
import styled from 'styled-components';
import mybuddyLogo from '../../assets/logo/logo_navy.svg';

const InfoCardWrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f1f1f1;
  border-radius: 15px;
  padding: 40px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1199px) {
    height: 400px;
  }

  a {
    &:hover {
      color: var(--color-tertiary);
    }
  }
`;

const InfoLogo = styled.h3`
  width: 330px;

  @media screen and (max-width: 1199px) {
    width: 210px;
  }
`;

const NameWrapper = styled.ul`
  width: 200px;
  margin-left: 50px;

  @media screen and (max-width: 1199px) {
    margin-left: 80px;
  }
`;

const Name = styled.li`
  height: 50px;
  font-size: var(--font-size-20);
  font-weight: 500;

  :nth-of-type(4) {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 1199px) {
    font-size: 18px;
    height: 40px;
  }
`;

const NameTitle = styled.li`
  font-family: var(--font-title);
  font-size: 35px;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-bottom: 20px;

  @media screen and (max-width: 1199px) {
    font-size: var(--font-size-24);
    margin-bottom: 10px;
  }
`;

const InfoWrapper = styled.div`
  padding-right: 150px;
  @media screen and (max-width: 1199px) {
    padding-right: 50px;
  }
`;

const InfoTitle = styled.h3`
  margin-bottom: 15px;
  font-family: var(--font-title);
  font-size: 30px;
  letter-spacing: 1.5px;

  @media screen and (max-width: 1199px) {
    font-size: var(--font-size-20);
    height: 20px;
  }
`;

const InfoText = styled.div`
  margin-bottom: 60px;
  height: 60px;
  font-size: 18px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 33px;
    font-size: 16px;
  }
`;

function InfoCard() {
  return (
    <InfoCardWrapper>
      <InfoLogo>
        <img src={mybuddyLogo} alt="마이버디 로고" />
      </InfoLogo>
      <NameWrapper>
        <NameTitle>frontend</NameTitle>
        <Name>
          🐶 &nbsp;<a href="https://github.com/notplastic2">notplastic</a>
        </Name>
        <Name>
          🐶 &nbsp;<a href="https://github.com/wjdwjdtn92">wjdwjdtn92</a>
        </Name>
        <Name>
          🐶 &nbsp;<a href="https://github.com/wangamy0222">wangamy</a>
        </Name>
        <NameTitle>backend</NameTitle>
        <Name>
          🐶 &nbsp;<a href="https://github.com/sdoaolo">sdoaolo</a>
        </Name>
        <Name>
          🐶 &nbsp;<a href="https://github.com/JihooKang-KOR">JihooKang-KOR</a>
        </Name>
        <Name>
          🐶 &nbsp;<a href="https://github.com/Daw-Jeong">chicchicDawny</a>
        </Name>
      </NameWrapper>
      <InfoWrapper>
        <InfoText>
          <InfoTitle>registration number</InfoTitle> 212-34-5678
        </InfoText>
        <InfoText>
          <InfoTitle>TEL</InfoTitle> 010-1234-5678
        </InfoText>
        <InfoText>
          <InfoTitle>EMAIL</InfoTitle>
          <a href="mailto:mybuddy.helpdesk@gmail.com">
            mybuddy.helpdesk@gmail.com
          </a>
        </InfoText>
        <InfoText>
          <InfoTitle>GITHUB</InfoTitle>
          <a href="https://github.com/codestates-seb/seb42_main_011">
            MY BUDDY
          </a>
        </InfoText>
      </InfoWrapper>
    </InfoCardWrapper>
  );
}

export default InfoCard;
