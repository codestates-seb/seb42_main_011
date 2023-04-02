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
import PostEditLocation from './PostEditLocation';
import PostNewMap from '../PostNew/PostNewMap';
import PostDetailPage from '../../Pages/PostDetailPage';

import useGetAmenity from '../../hooks/amenity/useGetAmenity';
import Button from '../UI/Button';
import useAxiosErrorModal from '../../hooks/useAxiosErrorModal';

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
  const { openModal, closeModal, closeModalByIndex } = useModal();
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const { data } = useGetAmenity({ amenityId, enabled: amenityId !== null });
  const [displayImage, setDisplayImage] = useState(photoUrl);
  const onError = useAxiosErrorModal(true);

  const [updateData, setUpdateData] = useState({
    postContent,
    amenityName,
    photoImage: null,
    addressId: data ? data.data?.addressId : null,
    address: data ? data.data?.address : null,
    longitude: data ? data.data?.longitude : null,
    latitude: data ? data.data?.latitude : null,
  });

  const handleSelect = newPlace => {
    setUpdateData(preState => ({
      ...preState,
      addressId: newPlace.id,
      amenityName: newPlace.place_name,
      address: newPlace.address_name,
      longitude: newPlace.x,
      latitude: newPlace.y,
    }));
  };

  const handleLoactionSelectClick = () => {
    openModal(<PostNewMap onSelect={handleSelect} onClose={closeModal} />);
  };

  useEffect(() => {
    if (
      updateData.postContent !== postContent ||
      (data && updateData.addressId !== data.data.addressId) ||
      updateData.photoImage
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
      openModal(
        <PostDetailPage
          bulletinId={responseData.data.bulletinPostId}
          onClose={closeModal}
        />,
      );

      closeModalByIndex(0);
    },
    onError,
  });

  const handleClose = () => {
    onClose();
  };

  const handleSubmitClick = () => {
    const postData = {};
    let photoImage = '';

    postData.postContent = updateData.postContent || postContent;

    postData.addressId = updateData.addressId || null;
    postData.address = updateData.address || null;
    postData.longitude = updateData.longitude || null;
    postData.latitude = updateData.latitude || null;
    postData.amenityName = updateData.amenityName || null;

    if (updateData.photoImage) {
      photoImage = updateData.photoImage;
    }

    openModal(
      <ModalBase
        title="게시글 수정"
        content="게시글을 정말 수정하시겠습니까?"
        isFooterAnimaonClose={false}
        buttons={
          <Fragment>
            <Button
              onClick={() => {
                updateMutate({
                  bulletinId: bulletinPostId,
                  postData,
                  photoImage,
                });

                closeModal();
              }}
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
    handleOnchnage({ type: 'photoImage', value: file });
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
          <PostEditLocation
            onClick={handleLoactionSelectClick}
            amenityName={updateData.amenityName}
          />
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
