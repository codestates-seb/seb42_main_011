import React from 'react';
import styled from 'styled-components';

const StyledFeeds = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 90px;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 48px;
  }
`;

function Feeds({ children, onClick }) {
  return <StyledFeeds onClick={onClick}>{children}</StyledFeeds>;
}

export default Feeds;
