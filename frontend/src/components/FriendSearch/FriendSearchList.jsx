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
  const handleClick = event => {
    const $li = event.target.closest('li');
    if (!$li) {
      return;
    }

    const { memberId } = $li.dataset;
    onClick(memberId);
  };

  return (
    <StyledFriendSearchList colWidth={colWidth} onClick={handleClick}>
      {children}
    </StyledFriendSearchList>
  );
}

export default FriendSearchList;
