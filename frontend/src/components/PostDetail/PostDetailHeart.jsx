import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { ReactComponent as IconHeartSvg } from '../../assets/icons/icon-heart.svg';

import useCreateBulletinPostLike from '../../hooks/bulletinPostsLike/useCreateBulletinPostLike';
import useDeleteBulletinPostLike from '../../hooks/bulletinPostsLike/useDeleteBulletinPostLike';
import useAxiosErrorModal from '../../hooks/useAxiosErrorModal';
import useModal from '../../hooks/useModal';
import LoginRequestModal from '../UI/LoginRequestModal';

const HeartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const HeartIcon = styled(IconHeartSvg)`
  width: 28px;
  height: 26px;
`;

const HeartButton = styled.button`
  ${HeartIcon} {
    color: ${({ likeByUser }) =>
      likeByUser === 0 ? 'var(--color-light-0)' : 'var(--color-tertiary)'};
  }
`;

const HeartText = styled.p``;

const HeartCount = styled.p`
  color: var(--color-tertiary);
`;

function PostDetailHeart({ userId, likeCount, likeByUser, bulletinId }) {
  const queryClient = useQueryClient();
  const [heart, setHeart] = useState(likeByUser);
  const [count, setCount] = useState(likeCount);
  const onError = useAxiosErrorModal(true);
  const { openModal } = useModal();
  const debounceRef = useRef();
  const heartRef = useRef(heart);
  const likeByUserRef = useRef(likeByUser);

  useEffect(() => {
    setHeart(likeByUser);
    setCount(likeCount);

    likeByUserRef.current = likeByUser;
  }, [likeCount, likeByUser]);

  const { mutateAsync: likeMutate } = useCreateBulletinPostLike({
    onSuccess: responseData => {
      queryClient.setQueriesData('postDetail', oldData => ({
        ...oldData,
        data: {
          ...oldData.data,
          likeByUser: 1,
          likeCount: responseData.data.likeCount,
        },
      }));
    },
    onError,
  });

  const { mutateAsync: unlikeMutate } = useDeleteBulletinPostLike({
    onSuccess: responseData => {
      queryClient.setQueriesData('postDetail', oldData => ({
        ...oldData,
        data: {
          ...oldData.data,
          likeByUser: 0,
          likeCount: responseData.data.likeCount,
        },
      }));
    },
    onError,
  });

  const handleLike = async newLikeByUser => {
    if (newLikeByUser === 0) {
      unlikeMutate({ bulletinId });
      return;
    }
    likeMutate({ bulletinId });
  };

  const handleHeartClick = () => {
    if (!userId) {
      openModal(<LoginRequestModal />);
      return;
    }

    if (heart === 0) {
      setCount(preCount => preCount + 1);
      setHeart(1);
      return;
    }

    if (heart === 1) {
      setCount(preCount => preCount - 1);
      setHeart(0);
    }
  };

  useEffect(() => {
    heartRef.current = heart;
    debounceRef.current = setTimeout(() => {
      if (likeByUser !== heart) {
        handleLike(heart);
      }
    }, 3000);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [heart]);

  useEffect(() => {
    const timerId = debounceRef.current;

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }

      if (likeByUserRef.current !== heartRef.current) {
        handleLike(heartRef.current);
      }
    };
  }, []);

  return (
    <HeartContainer>
      <HeartButton onClick={handleHeartClick} likeByUser={heart}>
        <HeartIcon />
      </HeartButton>
      <HeartText>맘에 들어요</HeartText>
      <HeartCount>{count}</HeartCount>
    </HeartContainer>
  );
}

export default PostDetailHeart;
