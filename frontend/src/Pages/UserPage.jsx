import React, { useState } from 'react';
import styled from 'styled-components';
import MypageProfile from '../components/UI/MypageProfile';
/* import { ReactComponent as ProfileTitle } from '../assets/logo/mypage_logo.svg'; */
import USERDUMMY from '../components/UI/User/UserDummy';

const MyPageComponent = styled.section`
  width: 40vw;
  min-height: calc(100vh - 196px);
  display: flex;
  justify-content: start;
`;

const Profile = styled.aside`
  width: 40vw;
  min-height: calc(100vh- 200px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  max-height: calc(100vh - 300px);
  object-fit: cover;
  overflow-clip-margin: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* const TitleLogo = styled(ProfileTitle)`
  width: 60%;
  height: 22%;
  position: absolute;
  top: -8.5%;
  left: -13%;
  z-index: 10;
`; */

const MypageProfileComponent = styled(MypageProfile)`
  width: 90%;
  height: 50%;
  object-fit: cover;
  max-width: 700px;
  max-height: calc(100vh - 193px);
`;

function MyPage() {
  const [userdata] = useState(USERDUMMY.data);
  return (
    <MyPageComponent>
      <Profile>
        {userdata.map(({ id, data }) => (
          <ImageBox key={id}>
            {/* <TitleLogo /> */}
            <MypageProfileComponent src={data.profileUrl} alt="유저 프로필" />
          </ImageBox>
        ))}
      </Profile>
    </MyPageComponent>
  );
}

export default MyPage;
