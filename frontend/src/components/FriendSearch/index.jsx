import React from 'react';
import styled from 'styled-components';

import { ReactComponent as FriendShape } from '../../assets/shape/friend_shape.svg';
import { ScrollNone } from '../../styles/shared';

const FriendSearchWrapper = styled.article`
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`;

const FriendSearchContainer = styled.div`
  margin: 0 auto;
  padding: 0 3.5%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  ${ScrollNone}
`;

const FriendGreenShape = styled(FriendShape)`
  position: fixed;
  width: 250px;
  height: 400px;
  top: 20px;
  right: 40px;
`;

function FriendSearch({ children }) {
  return (
    <FriendSearchWrapper>
      <FriendGreenShape />
      <FriendSearchContainer>{children}</FriendSearchContainer>
    </FriendSearchWrapper>
  );
}

export default FriendSearch;
