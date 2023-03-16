import React from 'react';
import styled, { css } from 'styled-components';

const StyledFeeds = styled.ul`
  ${({ colWidth }) =>
    css`
      --col-width: ${colWidth};
    `}

  display: grid;
  grid-template-columns: repeat(auto-fill, var(--col-width));
  justify-content: center;
  /* gap: 90px; */

  grid-gap: 40px 90px;

  @media (max-width: 1363px) {
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, 280px);
    grid-gap: 0px 1px;
    padding-left: 30px;
  }
`;

function Feeds({ children, onClick, colWidth = '300px' }) {
  return (
    <StyledFeeds colWidth={colWidth} onClick={onClick}>
      {children}
    </StyledFeeds>
  );
}

export default Feeds;
