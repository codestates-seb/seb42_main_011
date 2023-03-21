/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import IconClose from '../../../assets/icons/icon-close.svg';
import ModalContext from '../../../context/ModalContext';

const ModalContainer = styled.aside`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 199;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-dark-0);
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 198;
`;

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
  width: 100%;
`;

const LogoImg = styled.img`
  z-index: 1;
  width: 55%;
  height: 100%;
`;

const ButtonContainer = styled.button`
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

function Modal({ titleImage, onClose = () => {}, children }) {
  const { showModal, closeModal } = useContext(ModalContext);

  const handleClose = () => {
    onClose();
    closeModal();
    console.log(showModal);
  };

  useEffect(() => {
    const closeOnEscapeKey = event => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ModalPortal wrapperId="modal-root">
      <ModalBg />
      <ModalContainer>
        <ModalOutside>
          <ModalInside>
            <Title>
              {titleImage ? (
                <LogoImg src={titleImage} alt="modal title" />
              ) : (
                'title here'
              )}
            </Title>
            <ButtonContainer onClick={handleClose}>
              <img src={IconClose} alt="close button" />
            </ButtonContainer>
            <Content>{children}</Content>
          </ModalInside>
        </ModalOutside>
      </ModalContainer>
    </ModalPortal>
  );
}

export default Modal;
