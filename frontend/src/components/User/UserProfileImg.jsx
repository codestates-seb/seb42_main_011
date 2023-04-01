import React from 'react';
import styled from 'styled-components';
import UserpageProfile from '../UI/UserpageProfile';
import { ReactComponent as Mountshape } from '../../assets/shape/mypage_shape_mount.svg';

const Profile = styled.aside`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;

  @media screen and (max-height: 750px) {
    padding-top: 40px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 7.9 / 10;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  min-width: 270px;
`;

const MountImg = styled(Mountshape)`
  position: absolute;
  width: 85%;
  bottom: -5%;
`;

const UserpageProfileComponent = styled(UserpageProfile)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function UserProfileImg({ Userdata, TitleImageUrl }) {
  if (!Userdata) {
    return null;
  }

  return (
    <Profile>
      <ImageBox>
        <h2>{TitleImageUrl}</h2>
        <UserpageProfileComponent
          src={
            Userdata.profileUrl ??
            'https://cdn-icons-png.flaticon.com/512/1130/1130933.png?w=2000&t=st=1680005925~exp=1680006525~hmac=8e8077d62e937c5ca56e24827f856a436440d7fb244eff53af34fffddc88d213'
          }
          alt={`${Userdata.dogName}의 프로필`}
        />
        <MountImg />
      </ImageBox>
    </Profile>
  );
}

export default UserProfileImg;
