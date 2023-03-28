import React from 'react';
import styled from 'styled-components';

const Warapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
  padding: 8px;
`;

function CommentsList({ onClick, children }) {
  return <Warapper onClick={onClick}>{children}</Warapper>;
}

export default CommentsList;
