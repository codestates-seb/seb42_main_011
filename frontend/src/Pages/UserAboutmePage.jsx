import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import Button from '../components/UI/Button';
import { deleteUserFollow, postUserFollow } from '../api/userApi';
import ModalBase from '../components/UI/Modal/ModalBase';
import useModal from '../hooks/useModal';

const AboutMe = styled.section`
  text-align: center;
  width: 100%;
  aspect-ratio: 2 / 1.25;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

const AboutMeContent = styled.div`
  width: 100%;
  white-space: pre-line;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  line-height: 40px;
  margin-bottom: 20px;
  word-wrap: break-word;

  @media screen and (max-height: 750px) {
    margin-bottom: 10px;
    font-size: var(--font-size-16);
  }
`;

const FollowButton = styled(Button)`
  background-color: var(--color-secondary);
  &:hover {
    background-color: var(--color-secondary);
  }
`;

function UserAboutmePage({ userdata, memberId, isMyPage }) {
  let AboutmeButton;
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  console.log(userdata);

  const [isLoadingFollowingStatus, setIsLoadingFollowingStatus] =
    useState(false);
  const { user: currentUser } = useSelector(state => state.auth);

  // Button change
  const userFollowMutation = useMutation(postUserFollow, {
    onSuccess: () => {
      queryClient.setQueriesData(['userData', memberId], oldData => ({
        ...oldData,
        data: {
          ...oldData.data,
          followByUser: 1,
        },
      }));

      openModal(
        <ModalBase
          title="FOLLOW"
          content="팔로우 했어요! :)"
          buttons={<Button>확인</Button>}
        />,
      );
    },
    onError: () => {
      openModal(
        <ModalBase
          title="FOLLOW"
          content="팔로우에 실패했어요 :/"
          buttons={<Button>확인</Button>}
        />,
      );
    },
  });

  const userFollowDeleteMutation = useMutation(deleteUserFollow, {
    onSuccess: () => {
      queryClient.setQueriesData(['userData', memberId], oldData => ({
        ...oldData,
        data: {
          ...oldData.data,
          followByUser: 0,
        },
      }));
      openModal(
        <ModalBase
          title="UNFOLLOW"
          content="팔로우를 끊었어요 :)"
          buttons={<Button>확인</Button>}
        />,
      );
    },
    onError: () => {
      openModal(
        <ModalBase
          title="UNFOLLOW"
          content="팔로우 끊기에 실패했어요 :/"
          buttons={<Button>확인</Button>}
        />,
      );
    },
  });

  // Click api call (delete, follow)
  const handleFollowClick = async () => {
    try {
      setIsLoadingFollowingStatus(true);

      if (userdata.followByUser === 1) {
        await userFollowDeleteMutation.mutateAsync({
          memberId,
        });
      } else if (userdata.followByUser === 0) {
        await userFollowMutation.mutateAsync({
          memberId,
        });
      }
    } catch (error) {
      console.error('Failed to update following status:', error);
    } finally {
      setIsLoadingFollowingStatus(false);
    }
  };

  if (!userdata) {
    return null;
  }

  const getFollowButtonText = () => {
    if (isLoadingFollowingStatus) {
      return '로딩중...';
    }
    if (userdata.followByUser === 1) {
      return '팔로우끊기';
    }
    return '팔로우';
  };

  // Button change by location
  if (isMyPage) {
    AboutmeButton = (
      <Link to={`/user/${memberId}/edit`}>
        <Button variant="medium">수정</Button>
      </Link>
    );
  } else {
    AboutmeButton = currentUser ? (
      <FollowButton
        variant="medium"
        onClick={handleFollowClick}
        disabled={isLoadingFollowingStatus}
      >
        {getFollowButtonText()}
      </FollowButton>
    ) : null;
  }
  return (
    <div>
      <AboutMe>
        <AboutMeContent>
          {!userdata.aboutMe ? (
            <p>아직 소개글이 없네요!</p>
          ) : (
            <p>{userdata.aboutMe}</p>
          )}
        </AboutMeContent>
        {AboutmeButton}
      </AboutMe>
    </div>
  );
}

export default UserAboutmePage;
