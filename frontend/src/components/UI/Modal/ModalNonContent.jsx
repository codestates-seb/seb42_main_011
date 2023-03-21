import React, { useEffect } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';

const ModalContainer = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 199;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function ModalNonContent({ wrapperId, children, isEscClose = false, onClose }) {
  const handleClose = async () => {
    await onClose();
  };

  const closeOnEscapeKey = event => {
    if (event.key === 'Escape') {
      onClose();
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
