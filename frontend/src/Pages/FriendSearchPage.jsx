import React, { useState } from 'react';
import styled from 'styled-components';
import FRIEND_DUMY from '../components/Feeds/FRIEND_DUMY';
import Feeds from '../components/Feeds/Feeds';
import FeedsTitle from '../components/Feeds/FeedsTitle';
import ProfileItem from '../components/Feeds/Feed/ProfileItem';

const Container = styled.article`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

const FeedWrapper = styled.div`
  width: 100%;
  height: 77.3%;
`;

const FeedContainer = styled.div`
  margin: 0 auto;
  padding: 0 3.5%;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
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
        description="다른 친구들을 찾아보세요!"
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
