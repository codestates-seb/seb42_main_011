import React from 'react';
import styled from 'styled-components';
import PostList from '../UI/PostList';

const StyledFeedList = styled(PostList)`
  @media (max-width: 1363px) {
    width: 90vw;
    grid-template-columns: repeat(auto-fill, 280px);
    padding-left: 30px;
    grid-gap: 0px 1px;
  }
`;

function FeedList({ children, onClick, colWidth = '300px' }) {
  return (
    <StyledFeedList colWidth={colWidth} onClick={onClick}>
      {children}
    </StyledFeedList>
  );
}

export default FeedList;
