import React, { useState } from 'react';
import styled from 'styled-components';
import UserHeader from '../components/UI/User/UserHeader';
import UserTabMenu from '../components/UI/User/UserTabMenu';
import USERDUMMY from '../components/UI/User/UserDummy';
import { ReactComponent as MypageShape } from '../assets/shpae/purple_shape.svg';

const MyPageContent = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
`;

const UserInfoWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 75%;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MypagePurpleShape = styled(MypageShape)`
  position: absolute;
  top: -15%;
  left: -9%;
  max-width: 208px;
  width: 35%;
  z-index: -1;
`;

const ContentBox = styled.div`
  z-index: 1;
  background-color: var(--color-light-0);
  width: 100%;
  height: 100%;
  border: var(--border);
  border-radius: 5px;
  padding: 20px;
  box-shadow: 10px 10px var(--color-dark-0);
`;

const AboutMe = styled.div`
  z-index: 1;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutMeContent = styled.div`
  width: 70%;
  height: 50%;
  background-color: lavender;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MyPage() {
  const [userdata] = useState(USERDUMMY.data);
  return (
    <MyPageContent>
      <UserHeader />
      <UserInfoWrapper>
        <MypagePurpleShape />
        {userdata.map(({ id, data }) => (
          <ContentBox key={id}>
            <UserTabMenu />
            <AboutMe>
              <AboutMeContent>{data.aboutMe}</AboutMeContent>
            </AboutMe>
          </ContentBox>
        ))}
      </UserInfoWrapper>
    </MyPageContent>
  );
}

export default MyPage;
