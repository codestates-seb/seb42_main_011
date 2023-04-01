import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

import Card from '../components/UI/Card/Card';
import RetryErrorBoundary from '../components/RetryErrorBoundary';
import Loading from '../components/UI/Loading';
import { FlexJustifyAlignCenter } from '../styles/shared';

const PostDetailEdit = lazy(() => import('../components/PostEdit'));

const PostDetailContainer = styled(Card)`
  ${FlexJustifyAlignCenter}
  max-width: 1163px;
  max-height: 800px;
  height: 100%;
  width: 100%;

  position: relative;
  overflow: hidden;

  gap: 18px;
  background-color: var(--color-light-0);

  @media screen and (max-width: 1199px) {
    scale: calc(0.9);
  }
  @media screen and (max-height: 800px) {
    scale: calc(0.9);
  }
`;

function PostEditPage({
  createdAt,
  dogName,
  nickname,
  bulletinPostId,
  profileUrl,
  likeCount,
  likeByUser,
  postContent,
  commentList,
  commentCount,
  amenityId,
  photoUrl,
  onClose,
  amenityName,
}) {
  return (
    <PostDetailContainer tag="article" borderRadius="20px">
      <RetryErrorBoundary>
        <Suspense fallback={<Loading />}>
          <PostDetailEdit
            createdAt={createdAt}
            dogName={dogName}
            nickname={nickname}
            bulletinPostId={bulletinPostId}
            profileUrl={profileUrl}
            likeCount={likeCount}
            likeByUser={likeByUser}
            postContent={postContent}
            commentList={commentList}
            commentCount={commentCount}
            photoUrl={photoUrl}
            onClose={onClose}
            amenityId={amenityId}
            amenityName={amenityName}
          />
        </Suspense>
      </RetryErrorBoundary>
    </PostDetailContainer>
  );
}

export default PostEditPage;
