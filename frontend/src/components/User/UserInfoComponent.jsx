import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MypageShape } from '../../assets/shape/purple_shape.svg';
import { ReactComponent as Stripeshape } from '../../assets/shape/mypage_shape_stripe.svg';
import UserAboutmePage from '../../Pages/UserAboutmePage';
import UserFeedPage from '../../Pages/UserFeedPage';
import UserPlacePage from '../../Pages/UserPlacePage';
import Card from '../UI/Card/Card';
import UserHeader from './UserHeader';
import UserTabMenu from './UserTabMenu';
import UserDeleteModal from './UserDeleteModal';

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
  position: relative;
  z-index: 1;
  background-color: pink;
`;

const MypagePurpleShape = styled(MypageShape)`
  position: absolute;
  top: -100px;
  left: -50px;
  width: 25%;
  min-width: 170px;
  max-width: 208px;
  max-height: 168px;
  z-index: -1;
`;
const ContentBox = styled(Card)`
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
  right: -11.6%;
  z-index: 1000;
  background-image: ${props => props.backgroundImage};
`;

const Contents = styled.div`
  margin-top: 3%;
  width: 100%;
  height: 87.5%;
`;

function UserInfoComponent({
  PageLocation,
  Userdata,
  showModal,
  modalType,
  toggleModal,
}) {
  let CardContents;

  if (PageLocation === '/mypage' || PageLocation === '/friendpage') {
    CardContents = <UserAboutmePage userdata={Userdata} />;
  } else if (
    PageLocation === '/mypage/feed' ||
    PageLocation === '/friendpage/feed'
  ) {
    CardContents = <UserFeedPage userdata={Userdata} />;
  } else if (
    PageLocation === '/mypage/place' ||
    PageLocation === '/friendpage/place'
  ) {
    CardContents = <UserPlacePage userdata={Userdata} />;
  }

  return (
    <MyPageContent>
      <UserHeader
        userdata={Userdata}
        toggleModal={toggleModal}
        showModal={showModal}
        modalType={modalType}
      />
      <UserInfoWrapper>
        <MypagePurpleShape />
        <ContentBox>
          <UserTabMenu />
          <Contents>{CardContents}</Contents>
          <StripeImg />
        </ContentBox>
      </UserInfoWrapper>
      {showModal && modalType === 'delete' && <UserDeleteModal />}
    </MyPageContent>
  );
}

export default UserInfoComponent;
