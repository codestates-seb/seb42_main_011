import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Card from '../components/UI/Card/Card';
import RetryErrorBoundary from '../components/RetryErrorBoundary';
import Loading from '../components/UI/Loading';
import { FlexJustifyAlignCenter } from '../styles/shared';

const PostDetail = lazy(() => import('../components/PostDetail'));

const PostDetailContainer = styled(Card)`
  ${FlexJustifyAlignCenter};
  max-width: 1163px;
  max-height: 800px;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  gap: 18px;
  background-color: var(--color-light-0);

  @media (max-width: 1363px) {
    scale: calc(0.9);
  }

  @media (max-width: 1024px) {
    scale: calc(0.8);
  }

  @media (max-width: 765px) {
    scale: calc(0.7);
  }
`;

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
