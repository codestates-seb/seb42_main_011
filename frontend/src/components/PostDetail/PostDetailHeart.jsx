import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { ReactComponent as IconHeartSvg } from '../../assets/icons/icon-heart.svg';

import useDebounce from '../../hooks/useDebounce';
import useCreateBulletinPostLike from '../../hooks/bulletinPostsLike/useCreateBulletinPostLike';
import useDeleteBulletinPostLike from '../../hooks/bulletinPostsLike/useDeleteBulletinPostLike';
import useAxiosErrorModal from '../../hooks/useAxiosErrorModal';

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

function PostDetailHeart({ likeCount, likeByUser, bulletinId }) {
  const queryClient = useQueryClient();
  const [heart, setHeart] = useState(likeByUser);
  const [count, setCount] = useState(likeCount);
  const debouncedHeart = useDebounce(heart, 3000);
  const onError = useAxiosErrorModal();

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

  const handleLike = newLikeByUser => {
    if (newLikeByUser === 0) {
      unlikeMutate({ bulletinId });
      return;
    }
    likeMutate({ bulletinId });
  };

  const handleHeartClick = () => {
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
    if (likeByUser !== debouncedHeart) {
      handleLike(debouncedHeart);
    }
  }, [debouncedHeart]);

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
