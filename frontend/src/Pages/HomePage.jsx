import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

import Feeds from '../components/Feeds';
import FeedsHeader from '../components/Feeds/FeedsHeader';
import FeedList from '../components/Feeds/FeedList';
import PostItem from '../components/UI/PostItem';
import ModalContext from '../context/ModalContext';

import FEED_DUMY from '../data/FEED_DUMY';

const Container = styled.article`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

function HomePage() {
  const [data] = useState(FEED_DUMY.data);
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);

  const handleClick = event => {
    const $li = event.target.closest('li');

    if (!$li) {
      return;
    }

    const { postId } = $li.dataset;
    openModal();
    navigate(`/${postId}`);
  };

  return (
    <Container>
      <FeedsHeader />
      <Feeds>
        <FeedList onClick={handleClick}>
          {data.map(
            ({
              bulletinPostId,
              photoUrl,
              postContent,
              commentCount,
              nickname,
              dogName,
              createdAt,
            }) => (
              <PostItem
                key={bulletinPostId}
                bulletinPostId={bulletinPostId}
                photoUrl={photoUrl}
                postContent={postContent}
                commentCount={commentCount}
                nickname={nickname}
                dogName={dogName}
                createdAt={createdAt}
              />
            ),
          )}
        </FeedList>
      </Feeds>
      <Outlet />
    </Container>
  );
}

export default HomePage;
