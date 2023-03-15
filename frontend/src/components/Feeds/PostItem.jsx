import React from 'react'
import styled from 'styled-components'

const ItemBox = styled.div`

  display: flex;
  flex-direction: column;
  border: var(--border);
  border-radius: 5px;
  width: 300px;
  height: 468px;
  overflow: hidden;
  &:hover{
    box-shadow: 10px 10px;
  };
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
  /* 텍스트 줄바꿈을 위해서 넣어 둠 */
  white-space: pre-line;
  /* 줄바꿈 : 단어 기준 */ 
  word-break: keep-all; 
`;

const ContentBox = styled.div`
  line-height: 1.4rem;
  padding-bottom: 12px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 3px;
  span {
    margin-left: 4px;
    font-size: 13px;
    line-height: 19px;
  };
`;

const MetaBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 11px 10px 10px 12px;
  .postitem__profile {
    font-weight: 500;
  };
  .postitem__createdAt {
    font-size: 13px;
    line-height: 22px;
    opacity: 0.5;
  };
`;

function PostItem({ photoUrl, postContent, commentCount, nickname, dogName, createdAt }) {
  return (
    <ItemBox>
      <PostImage src={photoUrl}/>
      <PostBox>
        <ContentBox>{postContent}</ContentBox>
        <CommentBox>
          <img src="icon/comment.svg" alt="" />
          <span>{commentCount}개</span>
        </CommentBox>
      </PostBox>
      <MetaBox>
        <div className='postitem__profile'>
          {nickname}🏠{dogName}
        </div>
        <span className='postitem__createdAt'>
          {createdAt}
        </span>
      </MetaBox>
    </ItemBox>
  );
}

export default PostItem