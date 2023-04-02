import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';

import PostList from '../UI/PostList';
import PostItem from '../UI/PostItem';
import getAmenityFeeds from '../../api/placeApi';

function PlaceFeedList({ amenityId, onClick, colWidth = '300px' }) {
  const queryClient = useQueryClient();
  const { isLoading, data, fetchNextPage, hasNextPage, isError } =
    useInfiniteQuery(
      'feeds',
      ({ pageParam = 1 }) =>
        getAmenityFeeds({ amenityId, page: pageParam, size: 12 }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (pages.length === lastPage.pageInfo.totalPages) {
            return undefined;
          }

          return lastPage.pageInfo.page + 1;
        },
      },
    );

  const handleClick = event => {
    const $li = event.target.closest('li');

    if (!$li) {
      return;
    }

    const { postId } = $li.dataset;

    if (postId) {
      onClick(postId);
    }
  };

  useEffect(
    () => () => {
      queryClient.removeQueries('feeds');
    },
    [],
  );

  return (
    <PostList colWidth={colWidth} onClick={handleClick}>
      {!isError &&
        !isLoading &&
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

export default PlaceFeedList;
