import React, { useState } from 'react';
import styled from 'styled-components';
import FEED_DUMY from '../components/Feeds/FEED_DUMY';
import Feeds from '../components/Feeds/Feeds';

import FeedsTitle from '../components/Feeds/FeedsTitle';

import PostItem from '../components/Feeds/Feed/PostItem';

const Container = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  gap: 16px;
`;

function HomePage() {
  const [data] = useState(FEED_DUMY.data);

  return (
    <Container>
      <FeedsTitle title="mypage" description="친구들의 피드를 확인해보세요!" />

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
    </Container>
  );
}

export default HomePage;
