import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import searchFriends from '../api/searchApi';

import FriendSearch from '../components/FriendSearch';
import FriendSearchHeader from '../components/FriendSearch/FriendSearchHeader';
import FriendSearchList from '../components/FriendSearch/FriendSearchList';
import PostProfileItem from '../components/UI/PostProfileItem';

const Container = styled.section`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

function FriendSearchPage() {
  const navigate = useNavigate();

  const handleClick = memberId => {
    navigate(`/user/${memberId}`);
  };

  const [searchParams, setSearchParams] = useSearchParams({
    searchType: 'dogName',
    searchName: '',
  });

  const searchType = searchParams.get('searchType');
  const searchName = searchParams.get('searchName');

  const handleSubmit = ({ newSearchName, newSearchType }) => {
    setSearchParams({ searchName: newSearchName, searchType: newSearchType });
  };

  const { data, fetchNextPage, hasNextPage, isError, isLoading, refetch } =
    useInfiniteQuery(
      'friendSearch',
      ({ pageParam = 1 }) =>
        searchFriends({
          page: pageParam,
          size: 10,
          type: searchType,
          name: searchName,
        }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (pages.length === lastPage.pageInfo.totalPages) {
            return undefined;
          }

          return lastPage.pageInfo.page + 1;
        },
      },
    );

  useEffect(() => {
    refetch();
  }, [searchType, searchName]);

  return (
    <Container>
      <FriendSearchHeader
        initialType={searchType || 'dogName'}
        initialName={searchName || ''}
        onSubmit={handleSubmit}
      />

      <FriendSearch>
        {searchName && searchType && (
          <FriendSearchList
            searchType={searchType}
            searchName={searchName}
            colWidth="280px"
            onClick={handleClick}
          >
            {!isError &&
              !isLoading &&
              !!data &&
              data.pages.map(({ data: fetchData }, pageIndex) =>
                fetchData.map(
                  ({ memberId, nickname, dogName, photoUrl }, idx) => {
                    const props = {
                      memberId,
                      photoUrl,
                      name: searchType === 'dogName' ? dogName : nickname,
                      key: memberId,
                      isLastItem:
                        pageIndex === Number(data.pages.length) - 1 &&
                        idx === fetchData.length - 1,
                      onFetch: hasNextPage ? fetchNextPage : () => {},
                    };

                    return <PostProfileItem {...props} />;
                  },
                ),
              )}
          </FriendSearchList>
        )}
      </FriendSearch>
    </Container>
  );
}

export default FriendSearchPage;
