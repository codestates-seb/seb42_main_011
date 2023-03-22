import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import Card from '../UI/Card/Card';
import PostDetailHeader from './PostDetailHeader';
import PostDetailnfo from './PostDetailnfo';

import Comments from '../Comments';
import CommentsForm from '../Comments/CommentsForm';

import FEED_DETAIL_DUMY from '../../data/FEED_DETAIL_DUMY';

const PostDetailContent = styled(Card)`
  min-height: 280px;
  padding: 12px 14px;
  transform: translate(-5px, -6px);
  box-shadow: 5px 6px 0 0 var(--color-dark-0);

  font-weight: 500;
  font-size: var(--font-size-16);
  line-height: 23px;

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: keep-all;
  resize: none;
`;

const ContentsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  width: 100%;

  overflow-y: hidden;
  padding-top: 100px;
  padding: 100px 16px 0 8px;
`;

function PostDetail({ handleClose, isEdit = false }) {
  const [
    {
      profileUrl,
      dogName,
      nickname,
      photoUrl,
      likeCount,
      amenityName,
      createdAt,
      postContent,
      commentList,
      commentCount,
    },
  ] = useState(FEED_DETAIL_DUMY.data);

  const tag = isEdit ? 'textarea' : 'section';

  return (
    <Fragment>
      <PostDetailHeader
        createdAt={createdAt}
        dogName={dogName}
        nickname={nickname}
        onClose={handleClose}
      />

      <PostDetailnfo
        profileUrl={profileUrl}
        dogName={dogName}
        nickname={nickname}
        photoUrl={photoUrl}
        likeCount={likeCount}
        amenityName={amenityName}
      />
      <ContentsContainer>
        <PostDetailContent tag={tag} borderRadius="5px">
          {postContent}
        </PostDetailContent>
        <Comments commentList={commentList} commentCount={commentCount} />
        <CommentsForm onSubmit={async id => console.log(id)} />
      </ContentsContainer>
    </Fragment>
  );
}

export default PostDetail;
