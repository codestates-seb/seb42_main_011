import React from 'react';
import styled, { css } from 'styled-components';
import useImageError from '../../hooks/useImageError';

import UserName from '../UI/UserName';

const imageCSS = css`
  border: var(--border);
  object-fit: cover;
  object-position: center;
`;

const Container = styled.section`
  flex: 1 0 50%;
  width: 100%;
  height: 100%;
  padding: 20px 0 20px 20px;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  ${imageCSS}

  height: 40px;
  width: 40px;
`;

const Picture = styled.img`
  ${imageCSS}

  height: 500px;
  width: inherit;
`;

function PostDetailnfo({ profileUrl, dogName, nickname, photoUrl, children }) {
  const [src, handleErrorImage] = useImageError(profileUrl);

  return (
    <Container>
      <Profile>
        <Avatar
          onError={handleErrorImage}
          src={src}
          alt={`${nickname} 프로필 사진`}
        />
        <UserName dogName={dogName} nickname={nickname} />
      </Profile>
      <Picture src={photoUrl} alt="게시글 사진" />
      {children}
    </Container>
  );
}

export default PostDetailnfo;
