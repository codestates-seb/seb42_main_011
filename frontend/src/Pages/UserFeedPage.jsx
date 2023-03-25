import React from 'react';
import styled from 'styled-components';

const FeedImgWrapper = styled.section`
  width: 100%;
  height: 100%;
  border: var(--border);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FeedImgInside = styled.div`
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const FeedImgContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FeedImgBox = styled.div`
  width: 33.3333%;
  aspect-ratio: 1/1;
  &:hover {
    opacity: 0.9;
  }
`;

const FeedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30%;
`;

const NoDataText = styled.p`
  text-align: center;
  line-height: 3rem;
  font-size: var(--font-size-20);
  font-weight: 500;
  margin-top: 20px;
`;
function UserFeedPage({ userdata, isMyPage }) {
  if (!userdata) {
    return null;
  }
  return (
    <FeedImgWrapper>
      <FeedImgInside>
        <FeedImgContent>
          {userdata?.bulletinPostForMyPageResponseDtos?.length ? (
            userdata.bulletinPostForMyPageResponseDtos.map(
              ({ bulletinPostId, photoUrl }) => (
                <FeedImgBox key={bulletinPostId}>
                  <FeedImg
                    src={photoUrl}
                    alt={`${userdata.dogName}의 게시글`}
                  />
                </FeedImgBox>
              ),
            )
          ) : (
            <TextWrapper>
              {' '}
              {isMyPage ? (
                <NoDataText>
                  아직 게시글이 없어요!
                  <br />
                  게시글을 등록해보세요 :)
                </NoDataText>
              ) : (
                <NoDataText>
                  아직 친구가 게시글을 <br /> 등록하지 않았어요 :)
                </NoDataText>
              )}
            </TextWrapper>
          )}
        </FeedImgContent>
      </FeedImgInside>
    </FeedImgWrapper>
  );
}

export default UserFeedPage;
