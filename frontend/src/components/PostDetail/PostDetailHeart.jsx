import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as IconHeartSvg } from '../../assets/icons/icon-heart.svg';
import useDebounce from '../../hooks/useDebounce';

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

function PostDetailHeart({ likeCount, onClick, likeByUser }) {
  const [heart, setHeart] = useState(likeByUser);
  const [count, setCount] = useState(likeCount);
  const debouncedHeart = useDebounce(heart, 3000);

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
      onClick(debouncedHeart);
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
