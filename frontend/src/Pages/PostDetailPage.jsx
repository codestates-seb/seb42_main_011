import React from 'react';
import styled from 'styled-components';

import Card from '../components/UI/Card/Card';
import PostDetail from '../components/PostDetail';

const PostDetailContainer = styled(Card)`
  display: flex;
  max-width: 1163px;
  max-height: 800px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  gap: 18px;
  background-color: var(--color-light-0);
`;

function FirendDetailPage({ postId, onClose }) {
  const handleClose = async () => {
    onClose();
  };

  return (
    <PostDetailContainer
      tag="article"
      borderRadius="20px"
      data-post-id={postId}
    >
      <PostDetail handleClose={handleClose} />
    </PostDetailContainer>
  );
}

export default FirendDetailPage;
