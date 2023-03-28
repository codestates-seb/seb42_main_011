import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  white-space: pre-wrap;
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
`;

function FriendSearchNotFound({ text }) {
  return (
    <Wrapper>
      <Text>{text}</Text>
    </Wrapper>
  );
}

export default FriendSearchNotFound;
