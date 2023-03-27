import React from 'react';
import styled from 'styled-components';

const MyBuddyInfo = styled.div`
  width: 100%;
  height: 700px;
  background-color: var(--color-light-0);
  margin: 15px auto;
  border-radius: 15px;
  padding: 40px;
  display: flex;

  @media screen and (max-width: 1199px) {
    height: 500px;
  }
`;

const MybuddyCard = styled.div`
  flex-grow: 1;
`;

const MyBuddyVideo = styled.div`
  width: 300px;
  height: 300px;
  background-color: pink;
  flex-grow: 1;
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

function MyBuddyInfoCard() {
  return (
    <MyBuddyInfo>
      <MyBuddyVideo>dkdk</MyBuddyVideo>
      <MybuddyCard>
        <InfoTitle>my buddy</InfoTitle>
        <InfoText>
          마이버디는 어쩌구 저쩌구 솰라솰라 <br />
          마이버디는 어쩌구 저쩌구 솰라솰라 <br />
          마이버디는 어쩌구 저쩌구 솰라솰라 <br />
        </InfoText>
      </MybuddyCard>
    </MyBuddyInfo>
  );
}

export default MyBuddyInfoCard;
