import React, { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';

import FriendSearchList from './FriendSearchList';
import PostProfileItem from '../UI/PostProfileItem';
import searchDefault from '../../api/searchDefaultApi';
import Loading from '../UI/Loading';

function FriendSearchDefault() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    refetch,
    remove,
  } = useInfiniteQuery(
    'friendDefault',
    ({ pageParam = 1 }) =>
      searchDefault({
        page: pageParam,
        size: 10,
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

  useEffect(() => {
    remove();
    refetch();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FriendSearchList colWidth="280px">
      {!isError &&
        !!data &&
        data.pages.map(({ data: fetchData }, pageIndex) =>
          fetchData.map(({ memberId, dogName, profileUrl }, idx) => {
            const props = {
              memberId,
              profileUrl,
              name: dogName,
              key: memberId,
              isLastItem:
                pageIndex === Number(data.pages.length) - 1 &&
                idx === fetchData.length - 1,
              onFetch: hasNextPage ? fetchNextPage : () => {},
            };

            return <PostProfileItem {...props} />;
          }),
        )}
    </FriendSearchList>
  );
}

export default FriendSearchDefault;
