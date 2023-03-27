import React from 'react';
import styled from 'styled-components';

const MainTitleFlow = styled.div`
  width: 100%;
  height: 50px;
  border-top: var(--border);
  border-bottom: var(--border);
  background-color: var(--color-secondary);
  color: var(--color-light-0);
  line-height: 50px;
`;

const MainTitleTrack = styled.div`
  display: flex;
  flex: 0 0 auto;
  white-space: nowrap;
  overflow: hidden;
`;

const MainTitleTrackContent = styled.div`
  animation: TextLoop 10s linear infinite;
  padding-right: 6vw;
  font-family: var(--font-title);
  font-size: 30px;
`;

function MainTitleFLow() {
  return (
    <MainTitleFlow>
      <MainTitleTrack>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
        <MainTitleTrackContent>MY BUDDY</MainTitleTrackContent>
      </MainTitleTrack>
    </MainTitleFlow>
  );
}

export default MainTitleFLow;
