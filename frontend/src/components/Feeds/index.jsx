import React from 'react';
import styled from 'styled-components';

import { ReactComponent as HomeShape } from '../../assets/shape/home_shape.svg';

const FeesdWrapper = styled.article`
  width: 100%;
  height: 77.3%;
`;

const FeedsContainer = styled.div`
  padding: 0 90px;
  height: 100%;

  @media (max-width: 1363px) {
    padding: 0 1%;
  }

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const HomeYellowShape = styled(HomeShape)`
  position: fixed;
  top: 75px;
  right: 10px;
`;

function Feeds({ children }) {
  return (
    <FeesdWrapper>
      <FeedsContainer>
        <HomeYellowShape />
        {children}
      </FeedsContainer>
    </FeesdWrapper>
  );
}

export default Feeds;
