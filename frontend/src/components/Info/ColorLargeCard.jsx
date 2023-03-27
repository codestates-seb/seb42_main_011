import React from 'react';
import styled from 'styled-components';

const ColorLargeCardWrapper = styled.div`
  width: 100%;
  height: 350px;
  background-color: var(--color-secondary);
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 40px 40px 0;
  text-align: center;

  @media screen and (max-width: 1199px) {
    height: 250px;
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

function ColorLargeCard() {
  return (
    <ColorLargeCardWrapper>
      <InfoTitle>Title Here</InfoTitle>
      <InfoText>
        마이버디는 어쩌구 저쩌구 솰라솰라 <br />
        마이버디는 어쩌구 저쩌구 솰라솰라 <br />
        마이버디는 어쩌구 저쩌구 솰라솰라 <br />
      </InfoText>
    </ColorLargeCardWrapper>
  );
}

export default ColorLargeCard;
