import React from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';

import PostList from '../UI/PostList';
import PostItem from '../UI/PostItem';
import { getBulletins } from '../../utils/api';

const StyledFeedList = styled(PostList)`
  @media (max-width: 1363px) {
    width: 90vw;
    grid-template-columns: repeat(auto-fill, 280px);
    padding-left: 30px;
    grid-gap: 0px 1px;
  }
`;

function FeedList({ onClick, colWidth = '300px' }) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'feeds',
    ({ pageParam = 1 }) => getBulletins({ page: pageParam, size: 10 }),
    {
      suspense: true,
      staleTime: Infinity,
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

  return (
    <StyledFeedList colWidth={colWidth} onClick={handleClick}>
      {!!data &&
        data.pages.map(({ data: fetchData }, pageIndex) =>
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
                onFetch: hasNextPage && fetchNextPage,
                key: bulletinPostId + pageIndex * 12,
              };

              return <PostItem {...props} />;
            },
          ),
        )}
    </StyledFeedList>
  );
}

export default FeedList;
