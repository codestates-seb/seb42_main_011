import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../UI/Button';
import infovideo from '../../assets/Info/info_video.gif';

const MyBuddyInfo = styled.div`
  width: 100%;
  height: 700px;
  background-color: var(--color-light-0);
  margin: 15px auto 10px;
  border-radius: 15px;
  padding: 40px;
  display: flex;
  overflow: hidden;

  @media screen and (max-width: 1199px) {
    height: 500px;
  }
`;

const MybuddyCard = styled.div`
  width: 45vw;
  padding: 120px 60px 0px 40px;
  margin-left: 40px;
  @media screen and (max-width: 1199px) {
    width: 60vw;
    padding: 25px 10px 40px;
  }
`;

const MyBuddyVideo = styled.div`
  width: 55vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Video = styled.img`
  width: 85%;
  @media screen and (max-width: 1199px) {
    width: 100%;
  }
`;

const InfoTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 70px;
  margin-bottom: 20px;
  font-weight: normal;

  span {
    font-family: var(--font-title);
    color: var(--color-tertiary);
  }

  @media screen and (max-width: 1199px) {
    font-size: 60px;
  }
`;

const InfoTextMain = styled.p`
  font-size: var(--font-size-24);
  font-weight: 500;
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  font-size: var(--font-size-20);
  margin-bottom: 30px;
  line-height: 50px;
`;

function MyBuddyInfoCard() {
  return (
    <MyBuddyInfo>
      <MyBuddyVideo>
        <Video src={infovideo} alt="마이버디 이용 화면 gif" />
      </MyBuddyVideo>
      <MybuddyCard>
        <InfoTitle>
          let&apos;s <span>paw</span>-ty!
        </InfoTitle>
        <InfoTextMain>오직 강아지들을 위한 SNS 마이버디</InfoTextMain>
        <InfoText>
          🐶 545만명 반려 강아지 집사들을 위한 SNS
          <br />
          소중한 반려 강아지를 자랑해보세요! <br />
          강아지 전용, 강아지 중심 SNS입니다. <br />
        </InfoText>
        <Link to="/home">
          <Button variant="large">마이버디 둘러보기</Button>
        </Link>
      </MybuddyCard>
    </MyBuddyInfo>
  );
}

export default MyBuddyInfoCard;
