import React from 'react';
import styled from 'styled-components';

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  border: var(--border);
  object-fit: cover;
  object-position: center;

  height: 40px;
  width: 40px;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: var(--font-size-20);
  line-height: 29px;
`;

function UserProfile({ profileUrl, dogName, nickname }) {
  const displayNameText = `${nickname}🏠${dogName}`;

  return (
    <Profile>
      <Avatar src={profileUrl} alt="프로필 사진" />
      <Name>{displayNameText}</Name>
    </Profile>
  );
}

export default UserProfile;
