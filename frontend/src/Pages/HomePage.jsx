import React, { useState } from 'react';
import styled from 'styled-components';
import FEED_DUMY from '../components/Feeds/FEED_DUMY';
import Feeds from '../components/Feeds/Feeds';
import FeedsTitle from '../components/Feeds/FeedsTitle';
import PostItem from '../components/Feeds/Feed/PostItem';
import { ReactComponent as HomeShape } from '../assets/shape/home_shape.svg';

const Container = styled.article`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

const HomeYellowShape = styled(HomeShape)`
  position: fixed;
  top: 75px;
  right: 10px;
`;

const FeedWrapper = styled.div`
  width: 100%;
  height: 77.3%;
`;

const FeedContainer = styled.div`
  padding: 0 90px;
  height: 100%;
  @media (max-width: 1363px) {
    padding: 0 1%;
  }
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
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
          <HomeYellowShape />
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
