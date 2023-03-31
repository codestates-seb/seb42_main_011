import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';

import PostDetailHeader from './PostDetailHeader';
import PostDetailnfo from './PostDetailnfo';
import PostDetailContent from './PostDetailContent';
import ModalBase from '../UI/Modal/ModalBase';
import Comments from '../Comments';
import CommentsForm from '../Comments/CommentsForm';

import PostDetailHeart from './PostDetailHeart';
import PostDetailLocation from './PostDetailLocation';
import PostEditPage from '../../Pages/PostEditPage';

import useModal from '../../hooks/useModal';
import useGetBulletinPost from '../../hooks/bulletinPosts/useGetBulletinPost';
import useDeleteBulletinPost from '../../hooks/bulletinPosts/useDeleteBulletinPost';
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
`;

function PostDetail({ userId, bulletinId, onClose }) {
  const queryClient = useQueryClient();
  const onError = useAxiosErrorModal(true);

  const { openModal, closeModal, closeAllModal, closeModalByIndex } =
    useModal();
  const {
    data: {
      data: {
        createdAt,
        dogName,
        nickname,
        bulletinPostId,
        profileUrl,
        likeCount,
        likeByUser,
        amenityName,
        postContent,
        commentList,
        commentCount,
        photoUrl,
        memberId,
        amenityId,
      },
    },
    queryKey,
  } = useGetBulletinPost({
    bulletinId,
  });

  const getMenuButtonType = () => {
    if (userId !== memberId) {
      return 'none';
    }

    return 'edit';
  };

  const { mutateAsync: deleteMutate } = useDeleteBulletinPost({
    onSuccess: () => {
      queryClient.removeQueries(queryKey);
      queryClient.invalidateQueries('feeds');
      closeAllModal();

      openModal(
        <ModalBase
          title="게시글 삭제 완료"
          content="게시글이 삭제 되었습니다"
          buttons={<Button>확인</Button>}
        />,
      );
    },
    onError,
  });

  const handleClose = () => {
    onClose();
  };

  const handleDeleteClick = () => {
    openModal(
      <ModalBase
        title="게시글 삭제"
        content="게시글을 정말 삭제하시겠습니까?"
        isFooterAnimaonClose={false}
        buttons={
          <Fragment>
            <Button
              onClick={() => deleteMutate({ bulletinId: bulletinPostId })}
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

  const handleEdit = () => {
    openModal(
      <PostEditPage
        createdAt={createdAt}
        dogName={dogName}
        nickname={nickname}
        bulletinPostId={bulletinPostId}
        profileUrl={profileUrl}
        likeCount={likeCount}
        likeByUser={likeByUser}
        amenityName={amenityName}
        postContent={postContent}
        commentList={commentList}
        commentCount={commentCount}
        photoUrl={photoUrl}
        onClose={onClose}
        amenityId={amenityId}
      />,
    );
    closeModalByIndex(0);
  };

  useEffect(() => () => queryClient.removeQueries(queryKey), []);

  return (
    bulletinPostId && (
      <Fragment>
        <PostDetailHeader
          createdAt={createdAt}
          dogName={dogName}
          nickname={nickname}
          menuButtonType={getMenuButtonType()}
          onClose={handleClose}
          onEdit={handleEdit}
          onDelete={() => handleDeleteClick(bulletinPostId)}
        />
        <PostDetailnfo
          profileUrl={profileUrl}
          dogName={dogName}
          nickname={nickname}
          photoUrl={photoUrl}
          memberId={memberId}
        >
          <InfoContainer>
            <PostDetailHeart
              likeCount={likeCount}
              bulletinId={bulletinPostId}
              likeByUser={likeByUser}
            />
            <PostDetailLocation amenityName={amenityName} />
          </InfoContainer>
        </PostDetailnfo>
        <ContentsContainer>
          <PostDetailContent postContent={postContent} />
          <Comments
            userId={userId}
            commentList={commentList}
            commentCount={commentCount}
          />
          <CommentsForm bulletinId={bulletinPostId} />
        </ContentsContainer>
      </Fragment>
    )
  );
}

export default PostDetail;
