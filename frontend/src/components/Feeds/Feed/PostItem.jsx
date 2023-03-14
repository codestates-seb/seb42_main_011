import React from 'react';
import styled from 'styled-components';

const ItemBox = styled.li`
  display: flex;
  flex-direction: column;
  border: var(--border);
  border-radius: 5px;
  overflow: hidden;
  width: 300px;

  &:hover {
    transform: translate3d(-0.625rem, -0.625rem, 0.1rem);
    box-shadow: 10px 10px 0 0 var(--color-dark-0);
  }
`;

const PostImage = styled.img`
  width: 300px;
  height: 300px;
  /* 정사각형 아닌 사진은 비율 그대로 확대되도록 */
  object-fit: cover;
`;

const PostBox = styled.div`
  padding: 10px 10px 13px 10px;
  color: var(--color-dark-0);
  border-top: var(--border);
  border-bottom: var(--border);
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentBox = styled.p`
  line-height: 1.4rem;
  padding-bottom: 12px;
  /* display: flex;
  align-items: center; */
  height: 72px;

  /* 텍스트 줄바꿈을 위해서 넣어 둠 */
  width: 100%;
  display: inline-block;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 3px;
`;

const Comment = styled.span`
  margin-left: 4px;
  font-size: 13px;
  line-height: 19px;
`;

const FeedInfos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 11px 10px 10px 12px;

  .postitem__createdAt {
  }
`;

const FeedInfosName = styled.div`
  font-weight: 500;
`;

const FeedInfosCreateAt = styled.span`
  font-size: 13px;
  line-height: 22px;
  opacity: 0.5;
`;

function PostItem({
  photoUrl,
  postContent,
  commentCount,
  nickname,
  dogName,
  createdAt,
}) {
  return (
    <ItemBox>
      <PostImage src={photoUrl} />
      <PostBox>
        <ContentBox>{postContent}</ContentBox>
        <CommentBox>
          <img src="icon/comment.svg" alt="" />
          <Comment>{commentCount}개</Comment>
        </CommentBox>
      </PostBox>
      <FeedInfos>
        <FeedInfosName>
          {nickname}🏠{dogName}
        </FeedInfosName>
        <FeedInfosCreateAt>{createdAt}</FeedInfosCreateAt>
      </FeedInfos>
    </ItemBox>
  );
}

export default PostItem;
