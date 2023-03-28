import React from 'react';
import styled from 'styled-components';

import { ReactComponent as IconLocationSvg } from '../../assets/icons/icon-location.svg';

const LcationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const LocationIcon = styled(IconLocationSvg)`
  width: 16px;
  height: 23px;
`;

const Location = styled.span``;

function PostDetailLocation({ amenityName }) {
  return (
    <LcationContainer>
      <LocationIcon />
      <Location>{amenityName}</Location>
    </LcationContainer>
  );
}

export default PostDetailLocation;
