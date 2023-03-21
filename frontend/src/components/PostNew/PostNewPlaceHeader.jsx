import React from 'react';
import styled from 'styled-components';

import { ReactComponent as IconCancle } from '../../assets/icons/icon-cancle.svg';

const Header = styled.section`
  padding: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: var(--color-dark-1);
`;

const HeaderTitle = styled.h3`
  flex: 1 1 0;
  color: var(--color-light-0);
`;

const CloseSvg = styled(IconCancle)`
  color: var(--color-light-0);
`;

const CloseButton = styled.button``;

function PostNewPlaceHeader({ onClose }) {
  return (
    <Header>
      <HeaderTitle>위치 선택</HeaderTitle>
      <CloseButton onClick={onClose}>
        <CloseSvg />
      </CloseButton>
    </Header>
  );
}

export default PostNewPlaceHeader;
