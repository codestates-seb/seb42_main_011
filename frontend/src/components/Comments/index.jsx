import React from 'react';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';

import CommentsCount from './CommentsCount';
import CommentsItem from './CommentsItem';
import CommentsList from './CommentsList';
import useUpdateComments from '../../hooks/comments/useUpdateComments';
import useDeleteComments from '../../hooks/comments/useDeleteComments';
import { StyleScrollNone } from '../../styles/shared';

const Wrapper = styled.section`
  height: 47.6%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CommentListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  ${StyleScrollNone}
`;

function Comments({ userId, commentList, commentCount }) {
  const queryClient = useQueryClient();

  const { mutateAsync: updateCommentsMutate } = useUpdateComments({
    onSuccess: responseData => {
      queryClient.setQueriesData('postDetail', oldData => ({
        ...oldData,
        data: {
          ...oldData.data,
          commentList: [
            ...oldData.data.commentList.map(x =>
              x.commentId === responseData.data.commentId
                ? { ...x, commentContent: responseData.data.commentContent }
                : x,
            ),
          ],
        },
      }));
    },
    onError: () => {},
  });

  const { mutateAsync: deleteCommentsMutate } = useDeleteComments({
    onSuccess: () => {
      queryClient.invalidateQueries('postDetail');
    },
    onError: () => {},
  });

  const handleUpdate = ({ commentId, newContent }) => {
    updateCommentsMutate({ commentId, commentContent: newContent });
  };

  const handleDelete = ({ commentId }) => {
    deleteCommentsMutate({ commentId });
  };

  return (
    <Wrapper>
      <CommentsCount count={commentCount} />
      <CommentListWrapper>
        <CommentsList>
          {commentList.map(
            ({
              commentId,
              commentContent,
              memberId,
              nickName,
              dogName,
              profileUrl,
            }) => (
              <CommentsItem
                key={`commentid_${commentId}`}
                commentId={commentId}
                commentContent={commentContent}
                memberId={memberId}
                nickName={nickName}
                dogName={dogName}
                profileUrl={profileUrl}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                displayEditMenu={userId === memberId}
              />
            ),
          )}
        </CommentsList>
      </CommentListWrapper>
    </Wrapper>
  );
}

export default Comments;
