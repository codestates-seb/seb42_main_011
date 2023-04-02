import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import UserProfile from '../UI/UserProfile';
import ImageUploadButton from '../UI/ImageUploadButton';

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

const PictureShare = css`
  background-color: var(--color-dark-2);
  height: 100%;
  max-height: 500px;
  width: inherit;
  border: var(--border);

  @media (max-width: 1024px) {
    max-height: 450px;
  }

  @media (max-width: 765px) {
    max-height: 420px;
  }
`;

const PictureBox = styled.div`
  ${PictureShare}
`;

const Picture = styled.img`
  ${PictureShare}
  object-fit: cover;
  object-position: center;
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

function PostNewlnfo({ profileUrl, dogName, nickname, onSelectImage }) {
  const [imgSrc, setImgSrc] = useState('');

  const handleUpload = (src, file) => {
    setImgSrc(src);
    onSelectImage(file);
  };

  return (
    <Container>
      <UserProfile
        dogName={dogName}
        nickname={nickname}
        profileUrl={profileUrl}
      />
      {imgSrc.length > 0 ? (
        <Picture src={imgSrc} alt="게시글 사진" />
      ) : (
        <PictureBox />
      )}
      <InfoContainer>
        <ImageUploadButton onUplad={handleUpload}>
          이미지 업로드
        </ImageUploadButton>
      </InfoContainer>
    </Container>
  );
}

export default PostNewlnfo;
