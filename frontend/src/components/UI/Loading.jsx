import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-family: var(--font-title);
  margin-top: 40px;
  font-size: 50px;
`;

function Loading() {
  return <Text>Loading</Text>;
}

export default Loading;
