import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MaleLogo } from '../../assets/icons/icon-man.svg';
import { ReactComponent as FemaleLogo } from '../../assets/icons/icon-woman.svg';
import FollowerModal from '../Follow/FollowerModal';
import FollowModal from '../Follow/FollowModal';

const UserHeaderWrapper = styled.section`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  font-weight: 500;
  z-index: 10;
  width: 90%;
  min-width: 490px;
  max-width: 850px;
  padding-right: 10px;
`;

const UserHeaderContent = styled.div`
  width: 100%;
`;

const UserDataWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  flex-grow: 0.07;
`;

const Gender = styled.div`
  width: 27px;
  height: 27px;
  padding-top: 30px;
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

const FollowSection = styled.div`
  display: flex;
  justify-content: space-around;

  .mypageClick {
    &:hover {
      cursor: pointer;
      font-weight: 1000;
    }
  }
`;

const Follower = styled.p`
  font-size: var(--font-size-20);
  padding-top: 35px;
  padding-right: 10px;
`;

const Follow = styled.p`
  font-size: var(--font-size-20);
  padding-top: 35px;
`;

const Number = styled.span`
  font-weight: bold;
  color: var(--color-primary);
`;

function UserHeader({ userdata, toggleModal, showModal, modalType }) {
  const location = useLocation();

  const AllowClickFollows =
    location.pathname === '/mypage' ||
    location.pathname === '/mypage/feed' ||
    location.pathname === '/mypage/place';

  const color = 'var(--color-tertiary)';
  const formatNumber = num => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num;
  };

  return (
    <UserHeaderWrapper UserHeaderWrapper>
      <UserHeaderContent>
        {userdata.map(({ id, data }) => (
          <UserDataWrapper key={id}>
            <Name>{data.dogName}</Name>
            <Nickname>{data.nickname}</Nickname>
            <Gender>
              {data.dogGender === 'MALE' ? (
                <MaleLogoIcon color={color} />
              ) : (
                <FemaleLogoIcon color={color} />
              )}
            </Gender>
            {AllowClickFollows ? (
              <FollowSection>
                <Follower
                  onClick={() => toggleModal('follower')}
                  className="mypageClick"
                >
                  <Number>{formatNumber(data.followerNumber)}</Number> 팔로워
                </Follower>
                <Follow
                  onClick={() => toggleModal('follow')}
                  className="mypageClick"
                >
                  <Number>{formatNumber(data.followeeNumber)}</Number> 팔로우
                </Follow>
              </FollowSection>
            ) : (
              <FollowSection>
                <Follower>
                  <Number>{formatNumber(data.followerNumber)}</Number> 팔로워
                </Follower>
                <Follow>
                  <Number>{formatNumber(data.followeeNumber)}</Number> 팔로우
                </Follow>
              </FollowSection>
            )}
          </UserDataWrapper>
        ))}
        {showModal && modalType === 'follower' && <FollowerModal />}
        {showModal && modalType === 'follow' && <FollowModal />}
      </UserHeaderContent>
    </UserHeaderWrapper>
  );
}

export default UserHeader;
