import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Modal from '../UI/Modal/Modal';
import Card from '../UI/Card/Card';
import FollowLogo from '../../assets/logo/following_logo.svg';
import { getUserFollowing } from '../../api/userApi';
import useModal from '../../hooks/useModal';

const NoFollowing = styled.div`
  width: 100%;
  height: 100%;
  font-size: var(--font-size-20);
  font-weight: 500;
  margin-top: 150px;
  text-align: center;
`;

const FollowingListCard = styled.div`
  width: 371px;
  height: auto;
  max-height: 410px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FollowingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 5px;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
`;

const FollowingCard = styled(Card)`
  width: 368px;
  height: 80px;
  box-shadow: 5px 5px var(--color-dark-0);
  border-radius: 5px;
  background-color: var(--color-light-0);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
`;

const Profile = styled.div`
  width: 16%;
  aspect-ratio: 1/1;
  border: var(--border);
  border-radius: 5px;
  flex-grow: 1;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
  vertical-align: top;
`;

const ProfileInfo = styled.div`
  flex-grow: 100;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const DogName = styled.h3`
  font-size: var(--font-size-20);
  font-weight: 500;
  margin-bottom: 5px;
`;

const NickName = styled.p`
  font-size: var(--font-size-13);
  font-weight: 500;
  color: var(--color-primary);
`;

function FollowModal() {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: following,
  } = useQuery('following', () =>
    getUserFollowing({
      page: 1,
      size: 10,
    }),
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleCardClick = memberId => {
    navigate(`/user/${memberId}`);
    closeModal();
  };

  return (
    <Modal titleImage={FollowLogo}>
      <FollowingListCard>
        {following.data.length === 0 ? (
          <NoFollowing>아직 팔로잉한 친구가 없어요!</NoFollowing>
        ) : (
          following.data.map(({ memberId, nickname, dogName, profileUrl }) => (
            <FollowingWrapper key={memberId}>
              <FollowingCard onClick={() => handleCardClick(memberId)}>
                <Profile>
                  <ProfileImg
                    src={profileUrl}
                    alt={`${dogName}의 프로필 이미지`}
                  />
                </Profile>
                <ProfileInfo>
                  <DogName>{dogName}</DogName>
                  <NickName>{nickname}</NickName>
                </ProfileInfo>
              </FollowingCard>
            </FollowingWrapper>
          ))
        )}
      </FollowingListCard>
    </Modal>
  );
}

export default FollowModal;
