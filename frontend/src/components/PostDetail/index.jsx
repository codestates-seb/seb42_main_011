import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';

import Card from '../UI/Card/Card';
import PostDetailHeader from './PostDetailHeader';
import PostDetailnfo from './PostDetailnfo';
import PostDetailHeart from './PostDetailHeart';
import PostDetailLocation from './PostDetailLocation';
import ModalBase from '../UI/Modal/ModalBase';
import Comments from '../Comments';
import CommentsForm from '../Comments/CommentsForm';

import useModal from '../../hooks/useModal';
import useGetBulletinPost from '../../hooks/bulletinPosts/useGetBulletinPost';
import useUpdateBulletinPost from '../../hooks/bulletinPosts/useUpdateBulletinPost';
import useDeleteBulletinPost from '../../hooks/bulletinPosts/useDeleteBulletinPost';
import useCreateComments from '../../hooks/comments/useCreateComments';
import useCreateBulletinPostLike from '../../hooks/bulletinPostsLike/useCreateBulletinPostLike';
import useDeleteBulletinPostLike from '../../hooks/bulletinPostsLike/useDeleteBulletinPostLike';

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

const InfoContainer = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;

  font-weight: 500;
  font-size: var(--font-size-16);
  line-height: 23px;
`;

const Button = styled.button`
  padding: 8px;
  border: var(--border);
  border-radius: 5px;
`;

function PostDetail({ userId, bulletinId, onClose }) {
  const [isEditMode, setIsEditMode] = useState();
  const queryClient = useQueryClient();
  const { openModal, closeModal, closeAllModal } = useModal();
  const { data, queryKey } = useGetBulletinPost({
    bulletinId,
  });

  const { mutateAsync: commentMutate } = useCreateComments({
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
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
  });

  const { mutateAsync: likeMutate } = useCreateBulletinPostLike({
    onSuccess: responseData => {
      queryClient.setQueriesData(queryKey, oldData => ({
        ...oldData,
        data: {
          ...oldData.data,
          likeByUser: 1,
          likeCount: responseData.data.likeCount,
        },
      }));
    },
    onError: () => {},
  });

  const { mutateAsync: unlikeMutate } = useDeleteBulletinPostLike({
    onSuccess: responseData => {
      queryClient.setQueriesData(queryKey, oldData => ({
        ...oldData,
        data: {
          ...oldData.data,
          likeByUser: 0,
          likeCount: responseData.data.likeCount,
        },
      }));
    },
    onError: () => {},
  });

  const { mutateAsync: updateMutate } = useUpdateBulletinPost({
    onSuccess: responseData => {
      queryClient.setQueriesData(queryKey, oldData => ({
        ...oldData,
        data: {
          ...oldData.data,
          likeByUser: 0,
          likeCount: responseData.data.likeCount,
        },
      }));
    },
    onError: () => {},
  });

  const { mutateAsync: deleteMutate } = useDeleteBulletinPost({
    onSuccess: () => {
      queryClient.removeQueries(queryKey);
      closeAllModal();

      openModal(
        <ModalBase
          title="게시글 삭제 완료"
          content="게시글이 삭제 되었습니다"
          buttons={<Button onClick={closeModal}>확인</Button>}
        />,
      );
    },
    onError: () => {},
  });

  const handleLikeClick = likeByUser => {
    if (likeByUser === 0) {
      unlikeMutate({ bulletinId });
      return;
    }
    likeMutate({ bulletinId });
  };

  const handleClose = () => {
    onClose();
  };

  const handleCommentSubmit = async ({ commentContent }) => {
    await commentMutate({
      commentContent,
      bulletinPostId: bulletinId,
    });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  useEffect(() => () => queryClient.removeQueries(queryKey), []);

  const handleDeleteClick = bulletinPostId => {
    openModal(
      <ModalBase
        title="게시글 삭제"
        content="게시글을 정말 삭제하시겠습니까?"
        buttons={
          <Fragment>
            <Button
              onClick={() => deleteMutate({ bulletinId: bulletinPostId })}
            >
              확인
            </Button>
            <Button
              onClick={() => {
                setIsEditMode(false);
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

  const handleSubmitClick = (bulletinPostId, postData, photoImage) => {
    updateMutate({ bulletinId: bulletinPostId, postData, photoImage });
  };

  const tag = isEditMode ? 'textarea' : 'section';

  return (
    data && (
      <Fragment>
        <PostDetailHeader
          createdAt={data.data.createdAt}
          dogName={data.data.dogName}
          nickname={data.data.nickname}
          menuButtonType={userId === data.data.memberId ? 'edit' : 'none'}
          onClose={handleClose}
          onEdit={handleEditClick}
          onDelete={() => handleDeleteClick(data.data.bulletinPostId)}
          onSubmit={handleSubmitClick}
        />

        <PostDetailnfo
          profileUrl={data.data.profileUrl}
          dogName={data.data.dogName}
          nickname={data.data.nickname}
          photoUrl={data.data.photoUrl}
        >
          <InfoContainer>
            <PostDetailHeart
              likeCount={data.data.likeCount}
              onClick={handleLikeClick}
              likeByUser={data.data.likeByUser}
            />
            <PostDetailLocation amenityName={data.data.amenityName} />
          </InfoContainer>
        </PostDetailnfo>
        <ContentsContainer>
          <PostDetailContent tag={tag} borderRadius="5px">
            {data.data.postContent}
          </PostDetailContent>
          <Comments
            userId={userId}
            commentList={data.data.commentList}
            commentCount={data.data.commentCount}
          />
          <CommentsForm onSubmit={handleCommentSubmit} />
        </ContentsContainer>
      </Fragment>
    )
  );
}

export default PostDetail;
