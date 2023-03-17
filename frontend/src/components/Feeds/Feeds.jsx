import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFeeds = styled.ul`
  ${({ colWidth }) =>
    css`
      --col-width: ${colWidth};
    `}

  display: grid;
  grid-template-columns: repeat(auto-fill, var(--col-width));
  justify-content: center;
  grid-gap: 40px 90px;

  ${({ location }) =>
    location.pathname === '/' &&
    css`
      @media (max-width: 1363px) {
        width: 90vw;
        grid-template-columns: repeat(auto-fill, 280px);
        padding-left: 30px;
        grid-gap: 0px 1px;
      }
    `}

  ${({ location }) =>
    location.pathname === '/friend' &&
    css`
      width: 90vw;
      display: grid;
      grid-template-columns: repeat(auto-fill, 280px);
      grid-gap: 51px 0px;
    `}
`;

function Feeds({ children, onClick, colWidth = '300px' }) {
  const location = useLocation();

  return (
    <StyledFeeds colWidth={colWidth} onClick={onClick} location={location}>
      {children}
    </StyledFeeds>
  );
}

export default Feeds;
