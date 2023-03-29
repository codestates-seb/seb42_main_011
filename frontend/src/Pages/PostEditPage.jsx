import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

import Card from '../components/UI/Card/Card';
import RetryErrorBoundary from '../components/RetryErrorBoundary';

const PostDetailEdit = lazy(() => import('../components/PostEdit'));

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
