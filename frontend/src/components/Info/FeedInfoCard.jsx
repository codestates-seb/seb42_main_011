import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Feed1 } from '../../assets/Info/feed1.svg';
import { ReactComponent as Feed2 } from '../../assets/Info/feed2.svg';
import { ReactComponent as Feed3 } from '../../assets/Info/feed3.svg';
import { ReactComponent as Feed4 } from '../../assets/Info/feed4.svg';
import { ReactComponent as Feed5 } from '../../assets/Info/feed5.svg';
import { ReactComponent as Feed6 } from '../../assets/Info/feed6.svg';

const FeedInfoWrapper = styled.div`
  width: 100%;
  height: 800px;
  background-color: var(--color-light-0);
  margin: 10px auto;
  border-radius: 15px;
  padding: 40px 40px 0;

  @media screen and (max-width: 1199px) {
    height: 700px;
  }
`;

const InfoTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 50px;
  margin-bottom: 20px;
  font-weight: normal;
`;

const InfoText = styled.p`
  margin-bottom: 90px;
  font-size: 20px;
  font-weight: 500;
  @media screen and (max-width: 1199px) {
    margin-bottom: 30px;
  }
`;

const FeedFlow = styled.div`
  width: 100%;
  height: 100%;
  color: var(--color-light-0);
  line-height: 50px;
`;

const FeedTrack = styled.div`
  display: flex;
  flex: 0 0 auto;
  white-space: nowrap;
  overflow: hidden;
`;

const FeedTrackContent = styled.div`
  display: inline-flex;
  width: 100%;
  animation: Loop 30s linear infinite;
  padding-right: 6vw;
`;

function FeedInfoCard() {
  return (
    <FeedInfoWrapper>
      <InfoTitle>feed</InfoTitle>
      <InfoText>마이버디에서 멍친구들의 다양한 피드를 확인해보세요!</InfoText>
      <FeedFlow>
        <FeedTrack>
          <FeedTrackContent>
            <Feed1 />
          </FeedTrackContent>
          <FeedTrackContent>
            <Feed2 />
          </FeedTrackContent>
          <FeedTrackContent>
            <Feed3 />
          </FeedTrackContent>
          <FeedTrackContent>
            <Feed4 />
          </FeedTrackContent>
          <FeedTrackContent>
            <Feed5 />
          </FeedTrackContent>
          <FeedTrackContent>
            <Feed6 />
          </FeedTrackContent>
        </FeedTrack>
      </FeedFlow>
    </FeedInfoWrapper>
  );
}

export default FeedInfoCard;
