import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';

import PostEditHeader from './PostEditHeader';
import PostDetailnfo from './PostEditlnfo';
import PostDetailContent from './PostEditContent';
import ModalBase from '../UI/Modal/ModalBase';
import Comments from '../Comments';

import useModal from '../../hooks/useModal';
import useUpdateBulletinPost from '../../hooks/bulletinPosts/useUpdateBulletinPost';
import CommentsForm from '../Comments/CommentsForm';
import ImageUploadButton from '../UI/ImageUploadButton';
import PostDetailLocation from './PostEditLocation';

import useGetAmenity from '../../hooks/amenity/useGetAmenity';

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

const InfoContainer = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;

  font-weight: 500;
  font-size: var(--font-size-16);
  line-height: 23px;
  position: relative;
  width: 100%;

  position: relative;
`;

const Button = styled.button`
  padding: 8px;
  border: var(--border);
  border-radius: 5px;
`;

function PostDetail({
  createdAt,
  dogName,
  nickname,
  bulletinPostId,
  profileUrl,
  amenityName,
  postContent,
  commentList,
  commentCount,
  photoUrl,
  onClose,
  amenityId,
}) {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const { data } = useGetAmenity({ amenityId });
  const [displayImage, setDisplayImage] = useState(photoUrl);

  const [updateData, setUpdateData] = useState({
    content: postContent,
    photoImage: '',
    addressId: data.data.addressId,
    address: data.data.address,
    longitude: data.data.longitude,
    latitude: data.data.latitude,
  });

  useEffect(() => {
    console.log(updateData.content, postContent);
    if (
      updateData.content !== postContent ||
      updateData.addressId !== data.data.addressId ||
      updateData.photoImage.length > 0
    ) {
      setDisabledSubmit(false);
      return;
    }

    setDisabledSubmit(true);
  }, [updateData]);

  const handleOnchnage = ({ type, value }) => {
    setUpdateData(preState => ({
      ...preState,
      [type]: value,
    }));
  };

  const { mutateAsync: updateMutate } = useUpdateBulletinPost({
    onSuccess: responseData => {
      queryClient.setQueriesData('postDetail', () => responseData);
    },
    onError: () => {},
  });

  const handleClose = () => {
    onClose();
  };

  const handleSubmitClick = () => {
    const postData = {};
    let photoImage = '';

    postData.content = updateData.content || postContent;
    console.log(postData);

    if (updateData.addressId !== data.data.addressId) {
      postData.addressId = updateData.addressId;
      postData.address = updateData.address;
      postData.longitude = updateData.longitude;
      postData.latitude = updateData.latitude;
    }

    if (updateData.photoImage?.length > 0) {
      photoImage = updateData.photoImage;
    }

    openModal(
      <ModalBase
        title="게시글 수정"
        content="게시글을 정말 수정하시겠습니까?"
        buttons={
          <Fragment>
            <Button
              onClick={() =>
                updateMutate({
                  bulletinId: bulletinPostId,
                  postData,
                  photoImage,
                })
              }
            >
              확인
            </Button>
            <Button
              onClick={() => {
                closeModal();
              }}
            >
              취소
            </Button>
          </Fragment>
        }
      />,
    );
  };

  const handleUploadImage = (newPhotoUrl, file) => {
    setUpdateData({ type: 'photoImage', value: file });
    setDisplayImage(newPhotoUrl);
  };

  return (
    <Fragment>
      <PostEditHeader
        createdAt={createdAt}
        dogName={dogName}
        nickname={nickname}
        menuButtonType="new"
        onClose={handleClose}
        disabledSubmit={disabledSubmit}
        onSubmit={() => handleSubmitClick(bulletinPostId)}
      />
      <PostDetailnfo
        profileUrl={profileUrl}
        dogName={dogName}
        nickname={nickname}
        photoUrl={displayImage}
      >
        <InfoContainer>
          <PostDetailLocation amenityName={amenityName} />
          <ImageUploadButton onUplad={handleUploadImage}>
            이미지 업로드
          </ImageUploadButton>
        </InfoContainer>
      </PostDetailnfo>
      <ContentsContainer>
        <PostDetailContent
          postContent={postContent}
          onChange={handleOnchnage}
        />
        <Comments commentList={commentList} commentCount={commentCount} />
        <CommentsForm bulletinId={bulletinPostId} />
      </ContentsContainer>
    </Fragment>
  );
}

export default PostDetail;
