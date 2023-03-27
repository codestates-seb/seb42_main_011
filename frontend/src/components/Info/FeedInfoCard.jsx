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
  height: 700px;
  background-color: var(--color-light-0);
  margin: 15px auto;
  border-radius: 15px;
  padding: 40px 40px 0;
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

const InfoTitle = styled.h2`
  font-family: var(--font-title);
  font-size: 50px;
  margin-bottom: 20px;
  font-weight: normal;
`;
const InfoText = styled.p`
  margin-bottom: 30px;
`;
function FeedInfoCard() {
  return (
    <FeedInfoWrapper>
      <InfoTitle>feed</InfoTitle>
      <InfoText>
        소개 텍스트다아아아아아아아아아아아아아아아아아앙아아아아아아아아
      </InfoText>
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
