import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ModalNonContent from './ModalNonContent';
import { ReactComponent as IconCancleSVG } from '../../../assets/icons/icon-cancle.svg';
import useModal from '../../../hooks/useModal';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--color-light-0);
  border: var(--border);
  border-radius: 5px;
  width: 360px;
  animation: ${({ isExiting }) =>
    isExiting
      ? css`
        roadRunnerOut 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards
        `
      : css`
          roadRunnerIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards
        `};
`;

const Padding = css`
  padding: 1rem;
`;

const Header = styled.div`
  ${Padding}
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const CancleButton = styled.button``;

const CancleIcon = styled(IconCancleSVG)`
  color: var(--color-dark-0);
  width: 16px;
  height: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
`;

const Content = styled.p`
  ${Padding}
  min-height: 60px;
`;

const Footer = styled.div`
  ${Padding}
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  gap: 8px;
`;

function ModalBase({
  title,
  content,
  buttons,
  isFooterAnimaonClose = true,
  isEscClose = false,
}) {
  const { closeModal } = useModal();
  const [isExiting, setIsExiting] = useState(false);

  const handleExitAnimation = () => {
    setIsExiting(true);
    setTimeout(() => {
      closeModal();
    }, 300); // Wait for the animation to complete
  };

  const props = {
    ...(isFooterAnimaonClose && { onClick: handleExitAnimation }),
  };

  return (
    <ModalNonContent isEscClose={isEscClose}>
      <Wrapper isExiting={isExiting}>
        <Header>
          <Title>{title}</Title>
          <CancleButton onClick={handleExitAnimation}>
            <CancleIcon />
          </CancleButton>
        </Header>
        <Content>{content}</Content>
        {buttons && <Footer {...props}>{buttons}</Footer>}
      </Wrapper>
    </ModalNonContent>
  );
}

export default ModalBase;
