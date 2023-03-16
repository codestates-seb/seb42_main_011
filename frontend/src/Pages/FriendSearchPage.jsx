import React, { useState } from 'react';
import styled from 'styled-components';
import FRIEND_DUMY from '../components/Feeds/FRIEND_DUMY';
import Feeds from '../components/Feeds/Feeds';
import FeedsTitle from '../components/Feeds/FeedsTitle';
import ProfileItem from '../components/Feeds/Feed/ProfileItem';

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

const SEARCH_OPTIONS = [
  { name: '닉네임', value: 'nickname' },
  { name: '강아지 이름', value: 'dogName' },
];

function FriendSearchPage() {
  const [data] = useState(FRIEND_DUMY.data);
  const [searchType, setsSearchType] = useState('dogName');
  // const navigate = useNavigate();

  const handleClick = event => {
    const $li = event.target.closest('li');
    console.log($li);
    if (!$li) {
      return;
    }

    const { memberId } = $li.dataset;
    console.log(memberId);
  };

  const onSearch = (search, type) => {
    console.log(search, type);
    setsSearchType(type);
  };

  return (
    <Container>
      <FeedsTitle
        title="mypage"
        description="친구들의 피드를 확인해보세요!"
        onSearch={onSearch}
        serachOptions={SEARCH_OPTIONS}
      />
      <FeedWrapper>
        <FeedContainer>
          <Feeds colWidth="220px" onClick={handleClick}>
            {data.map(({ memberId, nickname, dogName, photoUrl }) => (
              <ProfileItem
                key={memberId}
                memberId={memberId}
                name={searchType === 'dogName' ? dogName : nickname}
                photoUrl={photoUrl}
              />
            ))}
          </Feeds>
        </FeedContainer>
      </FeedWrapper>
    </Container>
  );
}

export default FriendSearchPage;
