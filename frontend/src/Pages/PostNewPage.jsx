import React from 'react';
import styled from 'styled-components';

import ModalNonContent from '../components/UI/Modal/ModalNonContent';

import Card from '../components/UI/Card/Card';
import PostNewlnfo from '../components/PostNew/PostNewlnfo';
import PostDetailHeader from '../components/PostDetail/PostDetailHeader';
import PostNew from '../components/PostNew';

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

const DUMY = {
  nickname: '알파벳',
  dogName: '더닝크루거',
  profileUrl:
    'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
};

function PostNewPage({ onClose }) {
  const today = new Date();

  return (
    <ModalNonContent onClose={onClose}>
      <PostDetailContainer tag="article" borderRadius="20px">
        <PostDetailHeader
          createdAt={today}
          dogName={DUMY.dogName}
          nickname={DUMY.nickname}
          onClose={onClose}
        />
        <PostNewlnfo
          profileUrl={DUMY.profileUrl}
          dogName={DUMY.dogName}
          nickname={DUMY.nickname}
        />

        <PostNew />
      </PostDetailContainer>
    </ModalNonContent>
  );
}

export default PostNewPage;
