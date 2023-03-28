import React from 'react';
import styled from 'styled-components';

import { ReactComponent as IconLocationSvg } from '../../assets/icons/icon-location.svg';

const LcationContainer = styled.button`
  position: absolute;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  max-width: 200px;
  word-break: keep-all;

  :hover {
    color: var(--color-primary);
  }
`;

const LocationIcon = styled(IconLocationSvg)`
  width: 16px;
  height: 23px;
`;

const Location = styled.span``;

function PostDetailLocation({ amenityName, className, onClick }) {
  return (
    <LcationContainer className={className} onClick={onClick}>
      <LocationIcon />
      <Location>{amenityName} (위치수정)</Location>
    </LcationContainer>
  );
}

export default PostDetailLocation;
