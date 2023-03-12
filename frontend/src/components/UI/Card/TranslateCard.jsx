import React from 'react';
import styled, { css } from 'styled-components';
import Card from './Card';

const StyledTranslateCard = styled(Card)`
  && {
    border: 0;
    background: var(--black);
  }
`;

const Contents = styled.div`
  width: inherit;
  height: inherit;
  border: 1.5px solid var(--black);
  border-radius: ${({ borderRadius }) => borderRadius};
  background: var(--white);

  ${({ isHoverTranslate }) =>
    isHoverTranslate
      ? css`
          &:hover {
            transform: translate(-8px, -10px);
          }
        `
      : css`
          transform: translate(-8px, -10px);
        `}
`;

function TranslateCard({
  borderRadius = '10px',
  isHoverTranslate = false,
  children,
  ...props
}) {
  return (
    <StyledTranslateCard borderRadius={borderRadius} {...props}>
      <Contents
        isHoverTranslate={isHoverTranslate}
        borderRadius={borderRadius}
        {...props}
      >
        {children}
      </Contents>
    </StyledTranslateCard>
  );
}

export default TranslateCard;
