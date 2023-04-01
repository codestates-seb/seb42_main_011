import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserInfoComponent from '../components/User/UserInfoComponent';
import UserProfileImg from '../components/User/UserProfileImg';
import UserDeleteModal from '../components/User/UserDeleteModal';
import useModal from '../hooks/useModal';
import { ReactComponent as ProfileTitle } from '../assets/logo/mypage_logo.svg';
import { ReactComponent as FriendProfileTitle } from '../assets/logo/friend_mypage_logo.svg';
import { getUserProfile } from '../api/userApi';
import Loading from '../components/UI/Loading';

const MyPageComponent = styled.section`
  width: 100%;
  min-width: 1017px;
  max-width: 1700px;
  height: 100%;
  min-height: calc(100vh - 196px);
  display: flex;
  justify-content: start;
  position: relative;
`;

const UserDelete = styled.div`
  position: absolute;
  top: 20px;
  right: 45px;
  opacity: 0.5;
  &:hover {
    color: var(--color-tertiary);
    font-weight: 500;
    opacity: 1;
    cursor: pointer;
  }
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
  left: -10%;
  z-index: 10;
`;

function UserPage() {
  const { openModal } = useModal();
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

  const handleDeleteButtnClick = () => {
    openModal(<UserDeleteModal memberId={pageMemberId} />);
  };

  const {
    isLoading,
    error,
    data: Userdata,
  } = useQuery(['userData', pageMemberId], () =>
    getUserProfile({ memberId: pageMemberId }),
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <MyPageComponent>
      <UserDelete onClick={handleDeleteButtnClick}>
        {isMyPage ? '회원탈퇴' : null}
      </UserDelete>
      <UserProfileImg Userdata={Userdata.data} TitleImageUrl={TitleImageUrl} />
      <UserInfoComponent
        PageLocation={PageLocation}
        Userdata={Userdata.data}
        memberId={pageMemberId}
        isMyPage={isMyPage}
      />
    </MyPageComponent>
  );
}

export default UserPage;
