import React from 'react';
import styled from 'styled-components';
import { FlexJustifyAlignCenter } from '../../styles/shared';

const LoadingWrapper = styled.div`
  ${FlexJustifyAlignCenter}
  height: 100%;
  width: 100%;
`;

const Text = styled.p`
  font-family: var(--font-title);
  margin-top: 40px;
  font-size: 50px;
`;

function Loading() {
  return (
    <LoadingWrapper>
      <Text>Loading</Text>
    </LoadingWrapper>
  );
}

export default Loading;
