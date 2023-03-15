import React, { useState } from 'react';
import styled from 'styled-components';
import USERDUMMY from './UserDummy';
import { ReactComponent as MaleLogo } from '../../../assets/icons/icon-man.svg';
import { ReactComponent as FemaleLogo } from '../../../assets/icons/icon-woman.svg';

const UserHeaderContent = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  font-weight: 500;
  z-index: 10;
  width: 90%;
`;

const UserDataWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

const Name = styled.div`
  font-size: 40px;
  margin-top: 12px;
  flex-grow: 0.05;
`;
const Nickname = styled.div`
  font-size: var(--font-size-20);
  color: var(--color-primary);
  padding-top: 35px;
  flex-grow: 0.05;
`;
const Gender = styled.div`
  width: 27px;
  height: 27px;
  padding-top: 35px;
  flex-grow: 1;
`;

const MaleLogoIcon = styled(MaleLogo)`
  width: 27px;
  height: 27px;
`;

const FemaleLogoIcon = styled(FemaleLogo)`
  width: 27px;
  height: 27px;
`;

const Follower = styled.p`
  font-size: var(--font-size-20);
  padding-top: 35px;
  flex-grow: 0.05;
`;
const Follow = styled.p`
  font-size: var(--font-size-20);
  padding-top: 35px;
`;

const Number = styled.span`
  font-weight: bold;
  color: var(--color-primary);
`;

function UserHeader() {
  const [userdata] = useState(USERDUMMY.data);
  return (
    <UserHeaderContent>
      {userdata.map(({ id, data }) => (
        <UserDataWrapper key={id}>
          <Name>{data.dogName}</Name>
          <Nickname>{data.nickname}</Nickname>
          <Gender>
            {data.dogGender === 'MALE' ? <MaleLogoIcon /> : <FemaleLogoIcon />}
          </Gender>
          <Follower>
            <Number>{data.followerNumber}</Number> 팔로워
          </Follower>
          <Follow>
            <Number>{data.followeeNumber}</Number> 팔로우
          </Follow>
        </UserDataWrapper>
      ))}
    </UserHeaderContent>
  );
}

export default UserHeader;
