/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components';

const ModalOutside = styled.div`
  /* 안쪽 박스 가운데정렬 */
  display: flex;
  justify-content: center;
  align-items: center;

  width: 448px;
  height: 622px;
  background-color: var(--color-light-2);
  border: var(--border);
  border-radius: 10px;
`;
const ModalInside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative; /* 닫기 버튼을 위해서 */

  width: 408px;
  height: 582px;
  background-color: var(--color-light-0);
  border: var(--border);
  border-radius: 5px;
  padding: 20px;
`;
const Title = styled.div`
  flex-basis: 105px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 일러스트 받으면 넣어보고 css 추가할 예정 */
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const Content = styled.div`
  flex-grow: 1;
`;

function Modal({ children, titleImage }) {
  return (
    <ModalOutside>
      <ModalInside>
        <Title>
          { titleImage ? <img src={titleImage} alt='modal title' /> : 'title here' }
        </Title>
        <ButtonContainer><img src='icon/close.svg' alt='close button'/></ButtonContainer>
        <Content>{children}</Content>
      </ModalInside>
    </ModalOutside>
  )
}

export default Modal