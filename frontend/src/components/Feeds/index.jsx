import React from 'react';
import styled from 'styled-components';

import { ReactComponent as HomeShape } from '../../assets/shape/home_shape.svg';
import { ReactComponent as PlaceShape } from '../../assets/shape/place_shape.svg';

import FeedsHeader from './FeedsHeader';
import PlaceHeader from '../Place/PlaceHeader';
import { ScrollNone } from '../../styles/shared';

const Container = styled.article`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

const FeesdWrapper = styled.article`
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`;

const FeedsContainer = styled.div`
  padding: 0 90px;
  height: 100%;
  overflow-y: auto;
  ${ScrollNone}

  @media (max-width: 1363px) {
    padding: 0 1%;
  }
`;

const HomeYellowShape = styled(HomeShape)`
  position: fixed;
  top: 75px;
  right: 10px;
`;

const PlaceOrangeShape = styled(PlaceShape)`
  position: fixed;
  top: 140px;
  right: 90px;
  transform: scale(1.3);
  -webkit-transform: scale(1.3);
`;

function Feeds({ children, amenityName = '' }) {
  const isAmenityPage = amenityName.length > 0;
  const Shape = isAmenityPage ? PlaceOrangeShape : HomeYellowShape;

  return (
    <Container>
      {isAmenityPage ? (
        <PlaceHeader amenityName={amenityName} />
      ) : (
        <FeedsHeader />
      )}
      <FeesdWrapper>
        <FeedsContainer>
          <Shape />
          {children}
        </FeedsContainer>
      </FeesdWrapper>
    </Container>
  );
}

export default Feeds;
