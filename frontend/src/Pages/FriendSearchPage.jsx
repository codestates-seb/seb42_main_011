import React, { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import FriendSearch from '../components/FriendSearch';
import FriendSearchHeader from '../components/FriendSearch/FriendSearchHeader';
import FriendSearchList from '../components/FriendSearch/FriendSearchList';
import RetryErrorBoundary from '../components/RetryErrorBoundary';

function UserProfileLoading() {
  return <div> 사용자 정보를 불러오는 중입니다. </div>;
}

const Container = styled.section`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

function FriendSearchPage() {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('searchType');
  const searchName = searchParams.get('searchName');

  const handleClick = event => {
    const $li = event.target.closest('li');

    if (!$li) {
      return;
    }

    const { memberId } = $li.dataset;
    console.log(memberId);
  };

  return (
    <Container>
      <FriendSearchHeader
        initialType={searchType || 'dogName'}
        initialName={searchName || ''}
      />

      <FriendSearch>
        {searchName && searchType && (
          <RetryErrorBoundary>
            <Suspense fallback={<UserProfileLoading />}>
              <FriendSearchList
                searchType={searchType}
                searchName={searchName}
                colWidth="280px"
                onClick={handleClick}
              />
            </Suspense>
          </RetryErrorBoundary>
        )}
      </FriendSearch>
    </Container>
  );
}

export default FriendSearchPage;
