import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
  padding: 8px;
`;

function CommentsList({ onClick, children }) {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
}

export default CommentsList;
