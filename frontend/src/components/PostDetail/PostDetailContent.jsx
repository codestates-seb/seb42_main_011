import React from 'react';
import styled from 'styled-components';

import Card from '../UI/Card/Card';

const Content = styled(Card)`
  font-weight: 500;
  font-size: var(--font-size-16);
  line-height: 23px;
  min-height: 280px;
  padding: 12px 14px;
  transform: translate(-5px, -6px);
  box-shadow: 5px 6px 0 0 var(--color-dark-0);

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: keep-all;
  resize: none;
`;

function PostDetailContent({ postContent }) {
  return (
    <Content tag="div" borderRadius="5px">
      {postContent}
    </Content>
  );
}

export default PostDetailContent;
