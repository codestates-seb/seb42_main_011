import React from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';

import PostList from '../UI/PostList';
import PostProfileItem from '../UI/PostProfileItem';

import { getSearchs } from '../../utils/api';
import useObserverFetch from '../../hooks/useObserverFetch';

const StyledFriendSearchList = styled(PostList)`
  margin-top: 10px;
  width: 90vw;

  && {
    grid-gap: 51px 0px;
  }
`;

function FriendSearchList({
  searchType,
  searchName,
  onClick,
  colWidth = '280px',
}) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'friendSearch',
    ({ pageParam = 1 }) =>
      getSearchs({
        page: pageParam,
        size: 10,
        type: searchType,
        name: searchName,
      }),
    {
      suspense: true,
      getNextPageParam: (lastPage, pages) => {
        if (pages.length === lastPage.pageInfo.totalPages) {
          return undefined;
        }

        return lastPage.pageInfo.page + 1;
      },
    },
    {
      suspense: true,
    },
  );

  const { ref } = useObserverFetch({ onFetch: hasNextPage && fetchNextPage });

  const handleClick = event => {
    const $li = event.target.closest('li');
    if (!$li) {
      return;
    }

    const { memberId } = $li.dataset;
    onClick(memberId);
  };

  return (
    <StyledFriendSearchList colWidth={colWidth} onClick={handleClick}>
      {!!data &&
        data.pages.map(({ data: fetchData }) =>
          fetchData.map(({ memberId, nickname, dogName, photoUrl }, idx) => {
            const props = {
              memberId,
              photoUrl,
              name: searchType === 'dogName' ? dogName : nickname,
              key: memberId,
              ...(idx === fetchData.length - 1 && { ref }),
            };

            return <PostProfileItem {...props} />;
          }),
        )}
    </StyledFriendSearchList>
  );
}

export default FriendSearchList;
