import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserInfoComponent from '../components/User/UserInfoComponent';
import UserProfileImg from '../components/User/UserProfileImg';
import { ReactComponent as ProfileTitle } from '../assets/logo/mypage_logo.svg';
import { ReactComponent as FriendProfileTitle } from '../assets/logo/friend_mypage_logo.svg';
import { getUserProfile } from '../api/userApi';

const MyPageComponent = styled.section`
  width: 100%;
  max-width: 1700px;
  height: 100%;
  min-height: calc(100vh - 220px);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserProfileWrapper = styled.div`
  padding-top: 10px;
  width: 55vmin;
  aspect-ratio: 9 / 13;
`;

const UserInfoWrapper = styled.div`
  width: 80vmin;
  aspect-ratio: 1 /0.99;
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

const FriendTitleLogo = styled(FriendProfileTitle)`
  width: 50%;
  height: 27%;
  position: absolute;
  top: -10.5%;
  left: -8%;
  z-index: 10;
`;

function UserPage() {
  const { memberId: pageMemberId } = useParams();
  const location = useLocation();

  const currentUserMemberId = useSelector(state => state.auth.user); // 현재 사용자의 아이디

  let TitleImageUrl;

  const isMyPage = String(pageMemberId) === String(currentUserMemberId);

  const PageLocation = location.pathname;

  // Title logo change
  if (isMyPage) {
    TitleImageUrl = <TitleLogo alt="My page" />;
  } else {
    TitleImageUrl = <FriendTitleLogo alt="Friend page" />;
  }

  const {
    isLoading,
    error,
    data: Userdata,
  } = useQuery(['userData', pageMemberId], () =>
    getUserProfile({ memberId: pageMemberId }),
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <MyPageComponent>
      <UserWrapper>
        <UserProfileWrapper>
          <UserProfileImg
            Userdata={Userdata.data}
            TitleImageUrl={TitleImageUrl}
          />
        </UserProfileWrapper>
        <UserInfoWrapper>
          <UserInfoComponent
            PageLocation={PageLocation}
            Userdata={Userdata.data}
            memberId={pageMemberId}
            isMyPage={isMyPage}
          />
        </UserInfoWrapper>
      </UserWrapper>
    </MyPageComponent>
  );
}

export default UserPage;
