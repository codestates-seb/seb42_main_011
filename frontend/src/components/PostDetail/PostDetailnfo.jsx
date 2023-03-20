import React from 'react';
import styled, { css } from 'styled-components';

import UserName from '../UI/UserName';

import { ReactComponent as IconHeartSvg } from '../../assets/icons/icon-heart.svg';
import { ReactComponent as IconLocationSvg } from '../../assets/icons/icon-location.svg';

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

const HeartText = styled.p``;

const HeartCount = styled.p`
  color: var(--color-tertiary);
`;

const LcationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const LocationIcon = styled(IconLocationSvg)`
  width: 16px;
  height: 23px;
`;

const Location = styled.span``;

function PostDetailnfo({
  profileUrl,
  dogName,
  nickname,
  photoUrl,
  likeCount,
  amenityName,
}) {
  return (
    <Container>
      <Profile>
        <Avatar src={profileUrl} alt="프로필 사진" />
        <UserName dogName={dogName} nickname={nickname} />
      </Profile>
      <Picture src={photoUrl} alt="게시글 사진" />
      <InfoContainer>
        <HeartContainer>
          <HeartIcon />
          <HeartText>맘에 들어요</HeartText>
          <HeartCount>{likeCount}</HeartCount>
        </HeartContainer>
        <LcationContainer>
          <LocationIcon />
          <Location>{amenityName}</Location>
        </LcationContainer>
      </InfoContainer>
    </Container>
  );
}

export default PostDetailnfo;
