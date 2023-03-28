import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

import Card from '../components/UI/Card/Card';
import PostNewlnfo from '../components/PostNew/PostNewlnfo';
import PostNew from '../components/PostNew';
import ModalBase from '../components/UI/Modal/ModalBase';

import { createBulletinPost } from '../api/bulletinPostsApi';
import useModal from '../hooks/useModal';

import useGetMembersInfo from '../hooks/members/useGetMembersInfo';
import PostEditHeader from '../components/PostEdit/PostEditHeader';
import PostDetailPage from './PostDetailPage';

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

function PostNewPage({ onClose }) {
  const today = new Date();
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [photoImage, setPhotoImage] = useState('');
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const { openModal, closeModal, closeModalByIndex } = useModal();
  const memberId = useSelector(state => state.auth.user);
  const { data } = useGetMembersInfo({ memberId });

  const { mutateAsync } = useMutation(
    'creaetBulletinPosts',
    createBulletinPost,
    {
      onSuccess: responseData => {
        openModal(
          <PostDetailPage
            bulletinId={responseData.data.bulletinPostId}
            onClose={closeModal}
          />,
        );

        closeModalByIndex(0);
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
    data && (
      <PostDetailContainer tag="article" borderRadius="20px">
        <PostEditHeader
          createdAt={today}
          dogName={data.dogName}
          nickname={data.nickname}
          onClose={onClose}
          onSubmit={handleSubmit}
          disabledSubmit={disabledSubmit}
          isEdit
        />
        <PostNewlnfo
          profileUrl={data.profileUrl}
          dogName={data.dogName}
          nickname={data.nickname}
          onSelectImage={handleSelectImage}
        />

        <PostNew
          onContentChange={handleContentChange}
          onSelectPlace={handleSelectPlace}
        />
      </PostDetailContainer>
    )
  );
}

export default PostNewPage;
