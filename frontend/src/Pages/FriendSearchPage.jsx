import React, { useState } from 'react';
import styled from 'styled-components';

import FeedsTitle from '../components/Feeds/FeedsTitle';
import FriendSearch from '../components/FriendSearch';
import FriendSearchList from '../components/FriendSearch/FriendSearchList';
import PostProfileItem from '../components/UI/PostProfileItem';

import FRIEND_DUMY from '../data/FRIEND_DUMY';

const Container = styled.section`
  width: 100%;
  height: 100%;
  gap: 16px;
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
      <FriendSearch>
        <FriendSearchList colWidth="280px" onClick={handleClick}>
          {data.map(({ memberId, nickname, dogName, photoUrl }) => (
            <PostProfileItem
              key={memberId}
              memberId={memberId}
              name={searchType === 'dogName' ? dogName : nickname}
              photoUrl={photoUrl}
            />
          ))}
        </FriendSearchList>
      </FriendSearch>
    </Container>
  );
}

export default FriendSearchPage;
