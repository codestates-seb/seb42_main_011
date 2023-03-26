import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import FriendSearch from '../components/FriendSearch';
import FriendSearchHeader from '../components/FriendSearch/FriendSearchHeader';
import FriendSearchList from '../components/FriendSearch/FriendSearchList';

const Container = styled.section`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

function FriendSearchPage() {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('searchType');
  const searchName = searchParams.get('searchName');
  const naviate = useNavigate();

  const handleClick = memberId => {
    naviate(`/user/${memberId}`);
  };

  return (
    <Container>
      <FriendSearchHeader
        initialType={searchType || 'dogName'}
        initialName={searchName || ''}
      />

      <FriendSearch>
        {searchName && searchType && (
          <FriendSearchList
            searchType={searchType}
            searchName={searchName}
            colWidth="280px"
            onClick={handleClick}
          />
        )}
      </FriendSearch>
    </Container>
  );
}

export default FriendSearchPage;
