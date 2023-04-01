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
import useModal from '../../hooks/useModal';

const MyPageContent = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  position: relative;

  @media screen and (max-height: 750px) {
    padding: 0px 15px;
    margin-top: 15px;
  }
`;

const UserDelete = styled.div`
  position: absolute;
  top: 45px;
  right: 30px;
  opacity: 0.5;
  &:hover {
    color: var(--color-tertiary);
    font-weight: 500;
    opacity: 1;
    cursor: pointer;
  }
`;

const UserInfoWrapper = styled.div`
  position: relative;
  width: 95%;
  aspect-ratio: 2 / 1.6;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MypagePurpleShape = styled(MypageShape)`
  position: absolute;
  top: -15%;
  left: -8%;
  width: 25%;
  z-index: -1;

  @media screen and (max-height: 750px) {
    top: -13%;
  }
`;
const ContentBox = styled(Card)`
  z-index: 1;
  background-color: var(--color-light-0);
  width: 100%;
  height: 100%;
  border: var(--border);
  border-radius: 5px;
  padding: 20px;
  box-shadow: 10px 10px var(--color-dark-0);
  overflow: hidden;
  aspect-ratio: 2 / 1.6;
`;

const StripeImg = styled(Stripeshape)`
  width: 80%;
  height: 25%;
  position: absolute;
  bottom: -10%;
  right: -37%;
  z-index: 1000;
`;

const Contents = styled.div`
  margin-top: 3%;
  width: 100%;
  aspect-ratio: 2 / 1.35;

  @media screen and (max-height: 750px) {
    aspect-ratio: 2 / 1.32;
  }

  @media screen and (max-height: 650px) {
    aspect-ratio: 2 / 1.3;
  }
`;

function UserInfoComponent({ PageLocation, Userdata, memberId, isMyPage }) {
  const { openModal } = useModal();
  let CardContents;

  if (PageLocation === `/user/${memberId}`) {
    CardContents = (
      <UserAboutmePage
        memberId={memberId}
        userdata={Userdata}
        isMyPage={isMyPage}
      />
    );
  } else if (PageLocation === `/user/${memberId}/feed`) {
    CardContents = <UserFeedPage userdata={Userdata} isMyPage={isMyPage} />;
  } else if (PageLocation === `/user/${memberId}/place`) {
    CardContents = <UserPlacePage userdata={Userdata} isMyPage={isMyPage} />;
  }

  const handleDeleteButtnClick = () => {
    openModal(<UserDeleteModal memberId={memberId} />);
  };

  return (
    <MyPageContent>
      <UserDelete onClick={handleDeleteButtnClick}>
        {isMyPage ? '회원탈퇴' : null}
      </UserDelete>
      <UserHeader userdata={Userdata} memberId={memberId} isMyPage={isMyPage} />
      <UserInfoWrapper>
        <MypagePurpleShape />
        <ContentBox>
          <UserTabMenu memberId={memberId} />
          <Contents>{CardContents}</Contents>
          <StripeImg />
        </ContentBox>
      </UserInfoWrapper>
    </MyPageContent>
  );
}

export default UserInfoComponent;
