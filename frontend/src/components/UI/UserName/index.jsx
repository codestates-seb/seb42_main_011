import React from 'react';
import styled from 'styled-components';

const Name = styled.div`
  font-weight: 500;
  font-size: var(--font-size-20);
  line-height: 29px;
`;

function UserName({ dogName, nickname }) {
  const displayNameText = `${nickname}🏠${dogName}의 일기`;

  return <Name>{displayNameText}</Name>;
}

export default UserName;
