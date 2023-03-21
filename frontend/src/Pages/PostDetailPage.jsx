import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import ModalNonContent from '../components/UI/Modal/ModalNonContent';
import ModalContext from '../context/ModalContext';

import Card from '../components/UI/Card/Card';
import PostDetail from '../components/PostDetail';
import PostDetailHeader from '../components/PostDetail/PostDetailHeader';
import PostDetailnfo from '../components/PostDetail/PostDetailnfo';

import Comments from '../components/Comments';
import CommentsForm from '../components/Comments/CommentsForm';

import FEED_DETAIL_DUMY from '../data/FEED_DETAIL_DUMY';

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

function FirendDetailPage() {
  const { postId } = useParams();
  const { closeModal } = useContext(ModalContext);

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
  const navigate = useNavigate();

  const handleClose = async () => {
    closeModal();
    navigate('/');
  };

  return (
    <ModalNonContent onClose={handleClose}>
      <PostDetailContainer
        tag="article"
        borderRadius="20px"
        data-post-id={postId}
      >
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
          <PostDetail postContent={postContent} />
          <Comments commentList={commentList} commentCount={commentCount} />
          <CommentsForm onSubmit={async id => console.log(id)} />
        </ContentsContainer>
      </PostDetailContainer>
    </ModalNonContent>
  );
}

export default FirendDetailPage;
