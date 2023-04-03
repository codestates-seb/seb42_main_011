import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import ModalContext from '../../../context/ModalContext';
import { FlexJustifyAlignCenter } from '../../../styles/shared';
import ModalPortal from './ModalPortal';

const ModalContainer = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 199;

  ${FlexJustifyAlignCenter}
  background-color: rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
`;

function ModalNonContent({ wrapperId, children, isEscClose = false }) {
  const { closeModal } = useContext(ModalContext);
  const handleClose = () => {
    closeModal();
  };

  const closeOnEscapeKey = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isEscClose) {
      document.body.addEventListener('keydown', closeOnEscapeKey);
    }

    return () => {
      if (isEscClose) {
        document.body.removeEventListener('keydown', closeOnEscapeKey);
      }
    };
  }, [handleClose]);

  return (
    <ModalPortal wrapperId={wrapperId}>
      <ModalContainer>{children}</ModalContainer>
    </ModalPortal>
  );
}

export default ModalNonContent;
