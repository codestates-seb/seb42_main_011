import React from 'react';
import styled from 'styled-components';
import placevideo from '../../assets/Info/place_map.gif';

const PlaceCardWrapper = styled.div`
  width: 100%;
  height: 700px;
  background-color: var(--color-light-2);
  border-radius: 15px;
  padding: 40px;
  margin-bottom: 10px;
  display: flex;

  @media screen and (max-width: 1199px) {
    height: 500px;
  }
`;

const PlaceContent = styled.div`
  width: 45vw;
  padding: 140px 60px 0px 40px;

  @media screen and (max-width: 1199px) {
    padding: 80px 10px 40px;
  }
`;

const InfoTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 80px;
  margin-bottom: 20px;
  font-weight: normal;

  @media screen and (max-width: 1199px) {
    font-size: 50px;
  }
`;

const InfoText = styled.p`
  font-size: var(--font-size-24);
  line-height: 60px;

  & span {
    font-weight: 800;
    color: var(--color-primary);
  }

  @media screen and (max-width: 1199px) {
    font-size: 18px;
    line-height: 50px;
  }
`;

const PlaceVideo = styled.div`
  width: 55vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Video = styled.img`
  width: 100%;
`;

function PlaceCard() {
  return (
    <PlaceCardWrapper>
      <PlaceContent>
        <InfoTitle>place map</InfoTitle>
        <InfoText>
          마이버디만의 특색있는 <span>장소 검색</span> 서비스! <br />
          멍친구들이 추천한 장소를 지역별로 검색 해보세요! <br />
          키워드 검색도 물론 가능해요!
        </InfoText>
      </PlaceContent>
      <PlaceVideo>
        <Video src={placevideo} alt="지도 구현 gif" />
      </PlaceVideo>
    </PlaceCardWrapper>
  );
}

export default PlaceCard;
