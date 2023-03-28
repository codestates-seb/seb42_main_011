import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Card from '../components/UI/Card/Card';
import RetryErrorBoundary from '../components/RetryErrorBoundary';

const PostDetail = lazy(() => import('../components/PostDetail'));

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

  @media screen and (max-width: 1199px) {
    scale: calc(0.9);
  }
`;

function Loading() {
  return <div> 로딩 중입니다. </div>;
}

function PostDetailPage({ bulletinId, onClose }) {
  const userId = useSelector(state => state.auth.user);

  return (
    <PostDetailContainer tag="article" borderRadius="20px">
      <RetryErrorBoundary>
        <Suspense fallback={<Loading />}>
          <PostDetail
            userId={userId}
            bulletinId={bulletinId}
            onClose={onClose}
          />
        </Suspense>
      </RetryErrorBoundary>
    </PostDetailContainer>
  );
}

export default PostDetailPage;
