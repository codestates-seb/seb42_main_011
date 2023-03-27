import React from 'react';
import styled from 'styled-components';
import CommentsCount from './CommentsCount';
import CommentsItem from './CommentsItem';
import CommentsList from './CommentsList';

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 4px;
`;

function Comments({ commentList, commentCount, onClick }) {
  const handleClick = event => {
    event.preventDefault();

    const { commentId } = event.target.closest('li').dataset;

    if (!commentId) {
      return;
    }

    onClick(commentId);
  };

  return (
    <Wrapper>
      <CommentsCount count={commentCount} />
      <CommentsList onClick={handleClick}>
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
            />
          ),
        )}
      </CommentsList>
    </Wrapper>
  );
}

export default Comments;
