import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ProfileTitle } from '../assets/logo/mypage_logo.svg';
import { ReactComponent as FriendProfileTitle } from '../assets/logo/friend_mypage_logo.svg';
import USERDUMMY from '../components/User/UserDummy';
import FRINEDDUMMY from '../components/User/UserDummyFriend';
import UserInfoComponent from '../components/User/UserInfoComponent';
import ModalContext from '../context/ModalContext';
import UserProfileImg from '../components/User/UserProfileImg';

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
  const { showModal, openModal } = useContext(ModalContext);
  const [modalType, setModalType] = useState('');
  const location = useLocation();
  let TitleImageUrl;
  let Userdata;

  const PageLocation = location.pathname;

  const UserdeleteLocation =
    PageLocation === '/mypage' ||
    PageLocation === '/mypage/feed' ||
    PageLocation === '/mypage/place';

  // Title logo, Dummydata change
  if (PageLocation.includes('/mypage')) {
    TitleImageUrl = <TitleLogo alt="My page" />;
    Userdata = USERDUMMY.data;
  } else if (PageLocation.includes('/friendpage')) {
    TitleImageUrl = <FriendTitleLogo alt="Friend page" />;
    Userdata = FRINEDDUMMY.data;
  }

  const toggleModal = type => {
    setModalType(type);
    openModal();
  };

  return (
    <MyPageComponent>
      <UserDelete onClick={() => toggleModal('delete')}>
        {UserdeleteLocation ? '화원탈퇴' : null}
      </UserDelete>
      <UserProfileImg Userdata={Userdata} TitleImageUrl={TitleImageUrl} />
      <UserInfoComponent
        PageLocation={PageLocation}
        Userdata={Userdata}
        showModal={showModal}
        modalType={modalType}
        toggleModal={toggleModal}
      />
    </MyPageComponent>
  );
}

export default UserPage;
