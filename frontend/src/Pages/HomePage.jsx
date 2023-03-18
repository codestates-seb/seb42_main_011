import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import Feeds from '../components/Feeds';
import FeedsTitle from '../components/Feeds/FeedsTitle';
import FeedList from '../components/Feeds/FeedList';
import PostItem from '../components/UI/PostItem';
import FeedDetail from '../components/PostDetail';
import ModalContext from '../context/ModalContext';

import FEED_DUMY from '../data/FEED_DUMY';
import FEED_DETAIL_DUMY from '../data/FEED_DETAIL_DUMY';

const Container = styled.article`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

function HomePage() {
  const [data] = useState(FEED_DUMY.data);
  const [detailData] = useState(FEED_DETAIL_DUMY.data);
  const { showModal, openModal } = useContext(ModalContext);

  const handleClick = event => {
    const $li = event.target.closest('li');
    console.log($li);
    if (!$li) {
      return;
    }

    const { postId } = $li.dataset;

    openModal();
    console.log(postId);
  };

  return (
    <Container>
      <FeedsTitle title="home" description="친구들의 피드를 확인해보세요!" />

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

      {showModal && (
        <FeedDetail
          profileUrl={detailData.profileUrl}
          dogName={detailData.dogName}
          nickname={detailData.nickname}
          photoUrl={detailData.photoUrl}
          likeCount={detailData.likeCount}
          amenityName={detailData.amenityName}
          postContent={detailData.postContent}
          createdAt={detailData.createdAt}
        />
      )}
    </Container>
  );
}

export default HomePage;
