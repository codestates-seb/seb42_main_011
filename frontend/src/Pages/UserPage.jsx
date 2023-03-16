import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MypageShape } from '../assets/shape/purple_shape.svg';
import { ReactComponent as Stripeshape } from '../assets/shape/mypage_shape_stripe.svg';
import { ReactComponent as ProfileTitle } from '../assets/logo/mypage_logo.svg';
import { ReactComponent as FriendProfileTitle } from '../assets/logo/friend_mypage_logo.svg';
import { ReactComponent as Mountshape } from '../assets/shape/mypage_shape_mount.svg';
import Card from '../components/UI/Card/Card';
import USERDUMMY from '../components/UI/User/UserDummy';
import FRINEDDUMMY from '../components/UI/User/UserDummyFriend';
import UserHeader from '../components/UI/User/UserHeader';
import UserTabMenu from '../components/UI/User/UserTabMenu';
import UserpageProfile from '../components/UI/UserpageProfile';
import UserAboutmePage from './UserAboutmePage';
import UserFeedPage from './UserFeedPage';
import UserPlacePage from './UserPlacePage';

const MyPageComponent = styled.section`
  min-height: calc(100vh - 196px);
  min-width: 1080px;
  max-width: 1700px;
  display: flex;
  justify-content: start;
`;

const Profile = styled.aside`
  width: 47vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ImageBox = styled.div`
  position: relative;
  width: 80%;
  min-width: 400px;
  max-width: 550px;
  aspect-ratio: 7.9 / 10;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-left: 70px;
`;

const TitleLogo = styled(ProfileTitle)`
  width: 80%;
  height: 29%;
  max-height: 181px;
  position: absolute;
  top: -12%;
  left: -25%;
  z-index: 10;
`;

const MountImg = styled(Mountshape)`
  position: absolute;
  width: 85%;
  bottom: -5%;
`;

const FriendTitleLogo = styled(FriendProfileTitle)`
  width: 50%;
  height: 27%;
  position: absolute;
  top: -10.5%;
  left: -10%;
  z-index: 10;
`;

const UserpageProfileComponent = styled(UserpageProfile)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-width: 400px;
  max-width: 700px;
  max-height: 720px;
`;

const MyPageContent = styled.section`
  width: 53vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const UserInfoWrapper = styled.div`
  width: 90%;
  min-width: 400px;
  max-width: 850px;
  margin-right: 60px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MypagePurpleShape = styled(MypageShape)`
  position: absolute;
  top: -100px;
  left: -40px;
  width: 25%;
  min-width: 170px;
  max-width: 208px;
  max-height: 168px;
  z-index: -1;
`;
const ContentBox = styled(Card)`
  background-color: pink;
  z-index: 1;
  background-color: var(--color-light-0);
  aspect-ratio: 1/1;
  width: 100%;
  min-width: 490px;
  max-width: 850px;
  height: 100%;
  min-height: 300px;
  max-height: 660px;
  border: var(--border);
  border-radius: 5px;
  padding: 20px;
  box-shadow: 10px 10px var(--color-dark-0);
  overflow: hidden;
`;

const StripeImg = styled(Stripeshape)`
  width: 80%;
  max-width: 154px;
  height: 25%;
  max-height: 180px;
  position: absolute;
  bottom: -10%;
  right: -10%;
  z-index: 1000;
  background-image: ${props => props.backgroundImage};
`;

const Contents = styled.div`
  margin-top: 3%;
  width: 100%;
  height: 87.5%;
`;

function UserPage() {
  const location = useLocation();
  let TitleImageUrl;
  let CardContents;
  let Userdata;

  // Title logo, Dummydata change
  if (location.pathname.includes('/mypage')) {
    TitleImageUrl = <TitleLogo />;
    Userdata = USERDUMMY.data;
  } else if (location.pathname.includes('/friendpage')) {
    TitleImageUrl = <FriendTitleLogo />;
    Userdata = FRINEDDUMMY.data;
  }

  // Card contents change by locations
  if (location.pathname === '/mypage' || location.pathname === '/friendpage') {
    CardContents = <UserAboutmePage userdata={Userdata} />;
  } else if (
    location.pathname === '/mypage/feed' ||
    location.pathname === '/friendpage/feed'
  ) {
    CardContents = <UserFeedPage userdata={Userdata} />;
  } else if (
    location.pathname === '/mypage/place' ||
    location.pathname === '/friendpage/place'
  ) {
    CardContents = <UserPlacePage userdata={Userdata} />;
  }

  return (
    <MyPageComponent>
      <Profile>
        {Userdata.map(({ id, data }) => (
          <ImageBox key={id}>
            <h2>{TitleImageUrl}</h2>
            <UserpageProfileComponent
              src={data.profileUrl}
              alt={`${data.dogName}의 프로필`}
            />
            <MountImg />
          </ImageBox>
        ))}
      </Profile>
      <MyPageContent>
        <UserHeader userdata={Userdata} />
        <UserInfoWrapper>
          <MypagePurpleShape />
          <ContentBox>
            <UserTabMenu />
            <Contents>{CardContents}</Contents>
            <StripeImg />
          </ContentBox>
        </UserInfoWrapper>
      </MyPageContent>
    </MyPageComponent>
  );
}

export default UserPage;
