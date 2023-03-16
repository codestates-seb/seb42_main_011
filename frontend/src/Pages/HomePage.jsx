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
  gap: 16px;
`;

const FeedWrapper = styled.div`
  width: 100%;
  padding-bottom: 40px;
`;

const FeedContainer = styled.div`
  padding: 0 90px;
  height: 100%;
  @media (max-width: 1363px) {
    padding: 0 1%;
  }
`;

function HomePage() {
  const [data] = useState(FEED_DUMY.data);
  // const navigate = useNavigate();

  const handleClick = event => {
    const $li = event.target.closest('li');
    console.log($li);
    if (!$li) {
      return;
    }

    const { postId } = $li.dataset;

    console.log(postId);
  };

  return (
    <Container>
      <FeedsTitle title="home" description="친구들의 피드를 확인해보세요!" />
      <FeedWrapper>
        <FeedContainer>
          <Feeds onClick={handleClick}>
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
          </Feeds>
        </FeedContainer>
      </FeedWrapper>
    </Container>
  );
}

export default HomePage;
