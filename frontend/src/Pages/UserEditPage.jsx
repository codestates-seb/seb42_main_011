import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReactComponent as MypageShape } from '../assets/shape/purple_shape.svg';
import { ReactComponent as Stripeshape } from '../assets/shape/mypage_shape_stripe.svg';
import Card from '../components/UI/Card/Card';
import ImageUpload from '../components/User/ImageUpload';
import UserEditHeader from '../components/User/UserEditHeader';
import UserEditContent from '../components/User/UserEditContent';
import { getUserProfile } from '../api/userApi';
import Loading from '../components/UI/Loading';

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

const UserInfoContentWrapper = styled.div`
  width: 80vmin;
  aspect-ratio: 1 / 1;
`;

const Profile = styled.aside`
  width: 100%;
  height: 100%;
`;

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
  width: 20%;
  height: 25%;
  position: absolute;
  bottom: -10%;
  right: -8%;
  z-index: 1000;
`;

const ErrorText = styled.p`
  font-size: var(--font-size-24);
  font-weight: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function UserEditPage() {
  const { user: currentUser } = useSelector(state => state.auth);
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const {
    isLoading,
    error,
    data: Userdata,
  } = useQuery(['userData', memberId], () => getUserProfile({ memberId }));

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorText>Error: {error.message}</ErrorText>;
  }
  console.log(currentUser);
  console.log(memberId);

  if (String(currentUser) !== String(memberId)) {
    return <ErrorText>권한이 없습니다.</ErrorText>;
  }

  const handleCancel = () => {
    navigate(`/user/${memberId}`);
  };

  return (
    <MyPageComponent>
      <UserWrapper>
        <UserProfileWrapper>
          <Profile>
            <ImageUpload
              profileUrl={Userdata.data.profileUrl}
              nickname={Userdata.data.nickname}
              setFile={setFile}
            />
          </Profile>
        </UserProfileWrapper>
        <UserInfoContentWrapper>
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
                  file={file}
                />
                <StripeImg />
              </ContentBox>
            </UserInfoWrapper>
          </MyPageContent>
        </UserInfoContentWrapper>
      </UserWrapper>
    </MyPageComponent>
  );
}

export default UserEditPage;
