import React, { useState } from 'react';
import styled from 'styled-components';
import Feeds from '../components/Feeds/Feeds';
import FeedsTitle from '../components/Feeds/FeedsTitle';
import FEED_DUMY from '../components/Feeds/FEED_DUMY';
import PostItem from '../components/Feeds/PostItem';

const Container = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const FeedWrapper = styled.div`
  width: 100%;
  height: 640px;
  padding-bottom: 10px;
  min-height: calc(100vh- 180px);
  overflow-clip-margin: content-box;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FeedContainer = styled.div`
  padding: 0 90px;
`;

function HomePage() {
  const [data] = useState(FEED_DUMY.data);

  return (
    <Container>
      <FeedsTitle title="mypage" description="친구들의 피드를 확인해보세요!" />
      <FeedWrapper>
        <FeedContainer>
          <Feeds>
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
                  photoUrl={photoUrl}
                  postContent={postContent}
                  commentCount={commentCount}
                  nickname={nickname}
                  dogName={dogName}
                  createdAt={createdAt}
                />
              ),
            )}
          </Feeds>
        </FeedContainer>
      </FeedWrapper>
    </Container>
  );
}

export default HomePage;
