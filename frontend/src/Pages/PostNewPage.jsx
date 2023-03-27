import React, { Fragment, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';

import Card from '../components/UI/Card/Card';
import PostNewlnfo from '../components/PostNew/PostNewlnfo';
import PostDetailHeader from '../components/PostDetail/PostDetailHeader';
import PostNew from '../components/PostNew';
import ModalBase from '../components/UI/Modal/ModalBase';

import { createBulletinPost } from '../api/bulletinPostsApi';
import useModal from '../hooks/useModal';
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
  @media screen and (max-width: 1199px) {
    scale: calc(0.9);
  }
`;

const Button = styled.button`
  padding: 8px;
  border: var(--border);
  border-radius: 5px;
`;

const DUMY = {
  nickname: '알파벳',
  dogName: '더닝크루거',
  profileUrl:
    'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
};

function PostNewPage({ onClose }) {
  const today = new Date();
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [photoImage, setPhotoImage] = useState('');
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const { openModal, closeModal, closeAllModal } = useModal();
  const { mutateAsync } = useMutation(
    'creaetBulletinPosts',
    createBulletinPost,
    {
      onSuccess: () => {
        openModal(
          <ModalBase
            title="성공"
            content="게시글 등록에 성공했습니다"
            buttons={<Button onClick={closeModal}>확인</Button>}
          />,
        );

        closeAllModal();
      },
      onError: () => {
        openModal(
          <ModalBase
            title="실패"
            content="게시글 등록에 실패했습니다"
            buttons={<Button onClick={closeModal}>확인</Button>}
          />,
        );
      },
    },
  );

  const handleContentChange = newContent => {
    setContent(newContent);
  };

  const handleSelectPlace = newPlace => {
    setPlace(newPlace);
  };

  const handleSelectImage = newImage => {
    setPhotoImage(newImage);
  };

  useEffect(() => {
    if (content && place && photoImage) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [content, place, photoImage]);

  const sendData = async () => {
    const postData = {
      postContent: content,
      addressId: place.id,
      amenityName: place.place_name,
      address: place.address_name,
      longitude: place.x,
      latitude: place.y,
    };

    mutateAsync({ postData, photoImage });
    closeModal();
  };

  const handleSubmit = async () => {
    openModal(
      <ModalBase
        title="게시글 등록"
        content="정말 등록하시겠습니까?"
        buttons={
          <Fragment>
            <Button onClick={() => sendData()}>확인</Button>
            <Button onClick={closeModal}>취소</Button>
          </Fragment>
        }
      />,
    );
  };

  return (
    <RetryErrorBoundary>
      <Suspense>
        <PostDetailContainer tag="article" borderRadius="20px">
          <PostDetailHeader
            createdAt={today}
            dogName={DUMY.dogName}
            nickname={DUMY.nickname}
            onClose={onClose}
            onSubmit={handleSubmit}
            disabledSubmit={disabledSubmit}
            isEdit
          />
          <PostNewlnfo
            profileUrl={DUMY.profileUrl}
            dogName={DUMY.dogName}
            nickname={DUMY.nickname}
            onSelectImage={handleSelectImage}
          />

          <PostNew
            onContentChange={handleContentChange}
            onSelectPlace={handleSelectPlace}
          />
        </PostDetailContainer>
      </Suspense>
    </RetryErrorBoundary>
  );
}

export default PostNewPage;
