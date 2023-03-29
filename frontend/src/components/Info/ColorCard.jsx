import React from 'react';
import styled from 'styled-components';
import Dog2 from '../../assets/Info/dog2.svg';
import Dog3 from '../../assets/Info/dog3.svg';
import Dog4 from '../../assets/Info/dog4.svg';

const ColorCardWrapper = styled.div`
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  .colorcardWrapper {
    width: 32.7%;
    height: 100%;
    border-radius: 10px;
    padding: 10px;
  }

  @media screen and (max-width: 1199px) {
    height: 200px;
  }
`;

const TextWrapper = styled.div`
  padding: 20px 10px;
`;

const CardTitle = styled.h3`
  font-family: var(--font-title);
  font-size: 45px;
  color: var(--color-light-0);
  letter-spacing: 3px;
  position: absolute;
  top: 20px;
  left: 20px;

  @media screen and (max-width: 1199px) {
    font-size: 37px;
    letter-spacing: 2px;
  }
`;

const CardText = styled.p`
  color: var(--color-dark-0);
  margin-top: 60px;
  font-size: 22px;
  line-height: 35px;

  @media screen and (max-width: 1199px) {
    margin-top: 50px;
    line-height: 25px;
    font-size: 17.5px;
  }
`;

const InfoRedCard = styled.div`
  background-color: var(--color-tertiary);
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const RedDogImg = styled.img`
  width: 200px;
  height: 100%;
  margin-top: 10px;

  @media screen and (max-width: 1199px) {
    width: 130px;
    margin-top: 0px;
  }
`;

const InfoYellowCard = styled.div`
  background-color: var(--color-secondary);
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const YellowDogImg = styled.img`
  width: 160px;
  height: 100%;
  margin-top: 20px;
  margin-right: 10px;

  @media screen and (max-width: 1199px) {
    width: 110px;
    margin-top: 0px;
    margin-right: 5px;
  }
`;

const InfoBlueCard = styled.div`
  background-color: var(--color-primary);
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const BlueDogImg = styled.img`
  width: 120px;
  height: 100%;
  margin-top: 5px;
  margin-right: 10px;

  @media screen and (max-width: 1199px) {
    width: 90px;
    margin-top: 0px;
    margin-right: 0px;
  }
`;

function ColorCard() {
  return (
    <ColorCardWrapper>
      <InfoRedCard className="colorcardWrapper">
        <CardTitle>mungspective</CardTitle>
        <TextWrapper>
          <CardText>마이버디에서는 강아지의 눈으로 세상을 봐요</CardText>
        </TextWrapper>
        <RedDogImg src={Dog3} alt="강아지1 이미지" />
      </InfoRedCard>
      <InfoYellowCard className="colorcardWrapper">
        <CardTitle>dogs first</CardTitle>
        <TextWrapper>
          <CardText>마이버디에서는 견주 정보를 최소화해요</CardText>
        </TextWrapper>
        <YellowDogImg src={Dog4} alt="강아지2 이미지" />
      </InfoYellowCard>
      <InfoBlueCard className="colorcardWrapper">
        <TextWrapper>
          <CardTitle>dogs only</CardTitle>
          <CardText>강아지의, 강아지를 위한, 강아지에 의한 sns예요</CardText>
        </TextWrapper>
        <BlueDogImg src={Dog2} alt="강아지3 이미지" />
      </InfoBlueCard>
    </ColorCardWrapper>
  );
}

export default ColorCard;
