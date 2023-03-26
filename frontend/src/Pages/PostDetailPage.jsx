import React, { Suspense } from 'react';
import styled from 'styled-components';

import Card from '../components/UI/Card/Card';
import PostDetail from '../components/PostDetail';
import RetryErrorBoundary from '../components/RetryErrorBoundary';

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

function Loading() {
  return <div> 로딩 중입니다. </div>;
}

function PostDetailPage({ bulletinId, onClose }) {
  return (
    <PostDetailContainer
      tag="article"
      borderRadius="20px"
      data-post-id={bulletinId}
    >
      <RetryErrorBoundary>
        <Suspense fallback={<Loading />}>
          <PostDetail bulletinId={bulletinId} onClose={onClose} />
        </Suspense>
      </RetryErrorBoundary>
    </PostDetailContainer>
  );
}

export default PostDetailPage;
