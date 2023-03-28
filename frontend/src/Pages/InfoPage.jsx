import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import InfoLogo from '../assets/logo/info_logo.svg';
import { ReactComponent as DogLeft } from '../assets/Info/info_dog_left.svg';
import { ReactComponent as DogRight } from '../assets/Info/info_dog_right.svg';
import MainTitleFLow from '../components/Info/MainTitleFLow';
import MyBuddyInfoCard from '../components/Info/MyBuddyInfoCard';
import FeedInfoCard from '../components/Info/FeedInfoCard';
import ColorCard from '../components/Info/ColorCard';
import PlaceCard from '../components/Info/PlaceCard';
import ColorLargeCard from '../components/Info/ColorLargeCard';
import InfoCard from '../components/Info/InfoCard';

const MainWrapper = styled.div`
  width: 100%;
  min-width: 900px;
  height: calc(100vh - 200px);
  padding-bottom: 30px;
  background-color: var(--color-dark-0);
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MainTitleComponent = styled.div`
  width: 100%;
  height: 400px;
  min-width: 1200px;
  max-width: 1700px;
  margin: 0 auto;
  background-color: var(--color-dark-0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

const LogoImg = styled.img`
  margin-top: 10px;
  height: 200px;
  @media screen and (max-width: 1199px) {
    height: 150px;
  }
`;

const DogLeftImg = styled(DogLeft)`
  scale: calc(1.48);
  height: 400px;
  margin: 0 -40px 50px -85px;
  @media screen and (max-width: 1199px) {
    scale: calc(1.3);
    margin: 0 -105px 50px -130px;
  }
`;

const DogRightImg = styled(DogRight)`
  scale: calc(1.3);
  margin-right: -65px;
  margin-bottom: 80px;
  height: 400px;
  @media screen and (max-width: 1199px) {
    scale: calc(1.25);
    margin: 0 60px 75px -90px;
  }
`;

const MainContentWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1700px;
`;

const CardWrapper = styled.div`
  width: 97%;
  margin: 0 auto;
`;

function InfoPage() {
  return (
    <MainWrapper>
      <MainTitleComponent>
        <DogLeftImg />
        <LogoImg src={InfoLogo} alt="마이버디 타이틀" />
        <DogRightImg />
      </MainTitleComponent>
      <MainTitleFLow />
      <MainContentWrapper>
        <CardWrapper>
          <Zoom>
            <MyBuddyInfoCard />
          </Zoom>
          <Zoom>
            <FeedInfoCard />
          </Zoom>
          <Fade left>
            <ColorCard />
          </Fade>
          <Zoom>
            <PlaceCard />
          </Zoom>
          <Fade right>
            <ColorLargeCard />
          </Fade>
          <Zoom>
            <InfoCard />
          </Zoom>
        </CardWrapper>
      </MainContentWrapper>
    </MainWrapper>
  );
}

export default InfoPage;
