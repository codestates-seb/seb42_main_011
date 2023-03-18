import React from 'react';
import styled from 'styled-components';
import PostList from '../UI/PostList';

const StyledFriendSearchList = styled(PostList)`
  margin-top: 10px;
  width: 90vw;

  && {
    grid-gap: 51px 0px;
  }
`;

function FriendSearchList({ children, onClick, colWidth = '280px' }) {
  return (
    <StyledFriendSearchList colWidth={colWidth} onClick={onClick}>
      {children}
    </StyledFriendSearchList>
  );
}

export default FriendSearchList;
