import React from 'react';
import styled from 'styled-components';

const Warapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
  padding: 8px;
  overflow-y: auto;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  ::-webkit-scrollbar {
    display: none;
  }
`;

function CommentsList({ onClick, children }) {
  return <Warapper onClick={onClick}>{children}</Warapper>;
}

export default CommentsList;
