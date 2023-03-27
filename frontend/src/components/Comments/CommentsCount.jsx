import React from 'react';
import styled from 'styled-components';

const Warapper = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
`;

const Count = styled.span`
  color: var(--color-primary);
`;

function CommentsCount({ count }) {
  return (
    <Warapper>
      댓글 <Count>{count}</Count>개
    </Warapper>
  );
}

export default CommentsCount;
