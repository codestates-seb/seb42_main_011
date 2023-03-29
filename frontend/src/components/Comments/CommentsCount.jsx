import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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
    <Wrapper>
      댓글 <Count>{count}</Count>개
    </Wrapper>
  );
}

export default CommentsCount;
