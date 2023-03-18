import React from 'react';
import styled from 'styled-components';

const FriendSearchWrapper = styled.article`
  width: 100%;
  height: 77.3%;
`;

const FriendSearchContainer = styled.div`
  margin: 0 auto;
  padding: 0 3.5%;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

function FriendSearch({ children }) {
  return (
    <FriendSearchWrapper>
      <FriendSearchContainer>{children}</FriendSearchContainer>
    </FriendSearchWrapper>
  );
}

export default FriendSearch;
