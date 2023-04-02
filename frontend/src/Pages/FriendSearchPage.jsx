import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import searchFriends from '../api/searchApi';
import FriendSearch from '../components/FriendSearch';
import FriendSearchHeader from '../components/FriendSearch/FriendSearchHeader';
import FriendSearchList from '../components/FriendSearch/FriendSearchList';
import PostProfileItem from '../components/UI/PostProfileItem';
import FriendSearchDefault from '../components/FriendSearch/FriendSearchDefault';
import Loading from '../components/UI/Loading';

const Container = styled.section`
  width: 100%;
  height: 100%;
  gap: 16px;
`;

const NoResultsMessage = styled.p`
  text-align: center;
  margin-top: 100px;
  font-size: 20px;
`;

function FriendSearchPage() {
  const navigate = useNavigate();
  const [searchOptions, setSearchOptions] = useState({
    searchName: '',
    searchType: '',
  });

  const handleClick = memberId => {
    navigate(`/user/${memberId}`);
  };

  // console.log('1111', searchOptions.searchName, searchOptions.searchType);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    refetch,
    remove,
  } = useInfiniteQuery(
    'friendSearch',
    ({ pageParam = 1 }) =>
      searchFriends({
        page: pageParam,
        size: 10,
        type: searchOptions.searchType,
        name: searchOptions.searchName,
      }),
    {
      enabled: false,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length === lastPage.pageInfo.totalPages) {
          return undefined;
        }

        return lastPage.pageInfo.page + 1;
      },
    },
  );

  const handleSumbit = (newSearchName, newSearchType) => {
    setSearchOptions({ searchName: newSearchName, searchType: newSearchType });
  };

  useEffect(() => {
    remove();
    if (searchOptions.searchName.length > 0) refetch();
  }, [searchOptions]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isError && !!data && data.pages[0].pageInfo.totalElements === 0) {
    return (
      <Container>
        <FriendSearchHeader
          initialType={searchOptions.searchType || 'dogName'}
          initialName={searchOptions.searchName || ''}
          onSubmit={handleSumbit}
        />
        <FriendSearch>
          <NoResultsMessage>검색결과가 없습니다.</NoResultsMessage>
        </FriendSearch>
      </Container>
    );
  }
  return (
    <Container>
      <FriendSearchHeader
        initialType={searchOptions.searchType || 'dogName'}
        initialName={searchOptions.searchName || ''}
        onSubmit={handleSumbit}
      />

      <FriendSearch>
        {searchOptions.searchName.length > 0 && searchOptions.searchType ? (
          <FriendSearchList
            searchType={searchOptions.searchType}
            searchName={searchOptions.searchName}
            colWidth="280px"
            onClick={handleClick}
          >
            {!isError &&
              !isLoading &&
              !!data &&
              data.pages.map(({ data: fetchData }, pageIndex) =>
                fetchData.map(
                  ({ memberId, nickname, dogName, profileUrl }, idx) => {
                    const props = {
                      memberId,
                      profileUrl,
                      name:
                        searchOptions.searchType === 'dogName'
                          ? dogName
                          : nickname,
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
        ) : (
          <FriendSearchDefault onClick={handleClick} />
        )}
      </FriendSearch>
    </Container>
  );
}

export default FriendSearchPage;
