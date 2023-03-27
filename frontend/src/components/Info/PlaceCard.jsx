import React from 'react';
import styled from 'styled-components';
import placevideo from '../../assets/Info/place_map.gif';

const PlaceCardWrapper = styled.div`
  width: 100%;
  height: 700px;
  background-color: var(--color-light-2);
  border-radius: 15px;
  padding: 40px;
  margin-bottom: 15px;
  display: flex;
  @media screen and (max-width: 1199px) {
    height: 500px;
  }
`;

const PlaceContent = styled.div`
  width: 45vw;
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

const InfoTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 50px;
  margin-bottom: 20px;
  font-weight: normal;
`;

const InfoText = styled.p`
  margin-bottom: 30px;
`;

function PlaceCard() {
  return (
    <PlaceCardWrapper>
      <PlaceContent>
        <InfoTitle>place map</InfoTitle>
        <InfoText>지도도 있어요 으이앙아아아아아</InfoText>
      </PlaceContent>
      <PlaceVideo>
        <Video src={placevideo} alt="지도 구현 gif" />
      </PlaceVideo>
    </PlaceCardWrapper>
  );
}

export default PlaceCard;
