import React from 'react';
import styled from 'styled-components';

const ColorCardWrapper = styled.div`
  width: 100%;
  height: 250px;
  margin-bottom: 15px;
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
const InfoRedCard = styled.div`
  background-color: var(--color-tertiary);
`;
const InfoYellowCard = styled.div`
  background-color: var(--color-secondary);
`;
const InfoBlueCard = styled.div`
  background-color: var(--color-primary);
`;

function ColorCard() {
  return (
    <ColorCardWrapper>
      <InfoRedCard className="colorcardWrapper">으와</InfoRedCard>
      <InfoYellowCard className="colorcardWrapper">오와</InfoYellowCard>
      <InfoBlueCard className="colorcardWrapper">아아</InfoBlueCard>
    </ColorCardWrapper>
  );
}

export default ColorCard;
