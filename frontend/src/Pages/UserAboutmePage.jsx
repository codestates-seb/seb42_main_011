import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Button from '../components/UI/Button';

const AboutMe = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/0.85;
  max-height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

const AboutMeContent = styled.div`
  width: 100%;
  min-width: 376px;
  white-space: pre-wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  line-height: 40px;
  margin-bottom: 50px;
`;

const FollowButton = styled(Button)`
  background-color: var(--color-secondary);
  &:hover {
    background-color: var(--color-secondary);
  }
`;

function UserAboutmePage({ userdata }) {
  const location = useLocation();
  let AboumeButton;

  // Button change by location
  if (location.pathname.includes('/mypage')) {
    AboumeButton = <Button variant="medium">수정</Button>;
  } else if (location.pathname.includes('/friendpage')) {
    AboumeButton = <FollowButton variant="medium">팔로우</FollowButton>;
  }
  return (
    <div>
      {userdata.map(({ id, data }) => (
        <AboutMe key={id}>
          <AboutMeContent>{data.aboutMe}</AboutMeContent>
          {AboumeButton}
        </AboutMe>
      ))}
    </div>
  );
}

export default UserAboutmePage;
