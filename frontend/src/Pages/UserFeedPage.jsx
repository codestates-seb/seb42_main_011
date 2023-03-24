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
  height: auto;
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
`;
function UserFeedPage({ userdata }) {
  return (
    <FeedImgWrapper>
      <FeedImgInside>
        {userdata.map(({ id, data }) => (
          <FeedImgContent key={id}>
            {data.myBulletinPostDtos.map(({ bulletinPostId, photoUrl }) => (
              <FeedImgBox key={bulletinPostId}>
                <FeedImg src={photoUrl} alt={`${data.dogName}의 게시글`} />
              </FeedImgBox>
            ))}
          </FeedImgContent>
        ))}
      </FeedImgInside>
    </FeedImgWrapper>
  );
}

export default UserFeedPage;
