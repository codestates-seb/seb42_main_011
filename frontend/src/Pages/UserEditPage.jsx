import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { ReactComponent as MypageShape } from '../assets/shape/purple_shape.svg';
import { ReactComponent as Stripeshape } from '../assets/shape/mypage_shape_stripe.svg';
import Card from '../components/UI/Card/Card';
import ImageUpload from '../components/User/ImageUpload';
import UserEditHeader from '../components/User/UserEditHeader';
import UserEditContent from '../components/User/UserEditContent';
import { getUserProfile } from '../api/userApi';

const MyPageComponent = styled.section`
  width: 100%;
  min-width: 1017px;
  max-width: 1700px;
  height: 100%;
  min-height: calc(100vh - 196px);
  display: flex;
  position: relative;
`;

const Profile = styled.aside`
  width: 47vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: columns;
  overflow: hidden;
  padding: 20px 20px 20px 25px;
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
  position: relative;
  z-index: 1;
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
  padding: 30px 20px;
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

function UserEditPage() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: Userdata,
  } = useQuery(['userData', memberId], () => getUserProfile({ memberId }));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleCancel = () => {
    navigate(`/user/${memberId}`);
  };

  return (
    <MyPageComponent>
      <Profile>
        <ImageUpload
          profileUrl={Userdata.data.profileUrl}
          memberId={memberId}
          nickname={Userdata.data.nickname}
          aboutMe={Userdata.data.aboutMe}
        />
      </Profile>
      <MyPageContent>
        <UserEditHeader userdata={Userdata.data} />
        <UserInfoWrapper>
          <MypagePurpleShape />
          <ContentBox>
            <UserEditContent
              userdata={Userdata.data}
              onCancel={handleCancel}
              memberId={memberId}
              nickname={Userdata.data.nickname}
              aboutMe={Userdata.data.aboutMe}
              profileUrl={Userdata.data.profileUrl}
            />
            <StripeImg />
          </ContentBox>
        </UserInfoWrapper>
      </MyPageContent>
    </MyPageComponent>
  );
}

export default UserEditPage;
