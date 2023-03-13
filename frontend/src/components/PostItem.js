import React from 'react'
import styled from 'styled-components'

// border, line-height를 피그마와 비슷해보이게 rem단위 사용해서 바꿔봤습니다..

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
          <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 18L2.3 14.1C1.17644 12.4382 0.769993 10.4704 1.15622 8.56226C1.54244 6.65415 2.69506 4.93563 4.39977 3.72623C6.10447 2.51683 8.24526 1.89885 10.4241 1.9872C12.6029 2.07554 14.6715 2.86419 16.2453 4.20652C17.819 5.54884 18.7909 7.3535 18.9801 9.28494C19.1693 11.2164 18.563 13.1432 17.2739 14.7071C15.9848 16.271 14.1007 17.3656 11.9718 17.7873C9.84293 18.2091 7.6142 17.9293 5.7 17L1 18Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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