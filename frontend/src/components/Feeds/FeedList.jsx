import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';

import PostList from '../UI/PostList';
import PostItem from '../UI/PostItem';
import { getBulletinPostList } from '../../api/bulletinPostsApi';

function FeedList({ onClick, colWidth = '300px' }) {
  const queryClient = useQueryClient();
  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'feeds',
    ({ pageParam = 1 }) => getBulletinPostList({ page: pageParam, size: 12 }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length === lastPage.pageInfo.totalPages) {
          return undefined;
        }

        return lastPage.pageInfo.page + 1;
      },
    },
  );

  useEffect(
    () => () => () => {
      queryClient.removeQueries('feeds');
    },
    [],
  );

  return (
    <PostList colWidth={colWidth}>
      {!isLoading &&
        data &&
        data.pages?.map(({ data: fetchData }, pageIndex) =>
          fetchData.map(
            (
              {
                bulletinPostId,
                photoUrl,
                postContent,
                commentCount,
                nickname,
                dogName,
                createdAt,
                memberId,
              },
              idx,
            ) => {
              const props = {
                bulletinPostId,
                photoUrl,
                postContent,
                commentCount,
                nickname,
                dogName,
                createdAt,
                memberId,
                onClick,
                isLastItem:
                  pageIndex === Number(data.pages.length) - 1 &&
                  idx === fetchData.length - 1,
                onFetch: hasNextPage ? fetchNextPage : () => {},
                key: bulletinPostId + pageIndex * 12,
              };

              return <PostItem {...props} />;
            },
          ),
        )}
    </PostList>
  );
}

export default FeedList;
