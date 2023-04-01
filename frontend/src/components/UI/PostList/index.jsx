import React from 'react';
import styled, { css } from 'styled-components';

const StyledPostList = styled.ul`
  ${({ colWidth }) =>
    css`
      --col-width: ${colWidth};
    `}

  display: grid;
  grid-template-columns: repeat(auto-fill, var(--col-width));
  justify-content: center;
  grid-gap: 40px 90px;
  margin-bottom: 16px;

  @media (max-width: 1363px) {
    grid-template-columns: repeat(auto-fill, 280px);
    grid-gap: 20px 40px;
    padding: 0 30px;
  }
`;

function PostList({ children, onClick, colWidth = '300px', className }) {
  return (
    <StyledPostList colWidth={colWidth} onClick={onClick} className={className}>
      {children}
    </StyledPostList>
  );
}

export default PostList;
