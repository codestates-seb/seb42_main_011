import React from 'react';
import styled, { css } from 'styled-components';

const StyledCard = styled.div`
  border: var(--border);
  border-radius: ${({ borderRadius }) => borderRadius};
  background: var(--color-light-0);

  ${({ isHoverTranslate }) =>
    isHoverTranslate &&
    css`
      &:hover {
        transform: translate(-0.5rem, -0.625rem);
        box-shadow: 8px 10px 0 0 var(--color-dark-0);
      }
    `}

  ${({ isTranslate }) =>
    isTranslate &&
    css`
      transform: translate(-0.5rem, -0.625rem);
      box-shadow: 8px 10px 0 0 var(--color-dark-0);
    `}
`;

function Card({
  borderRadius = '10px',
  isHoverTranslate = false,
  isTranslate = false,
  children,
  ...props
}) {
  return (
    <StyledCard
      isHoverTranslate={isHoverTranslate}
      isTranslate={isTranslate}
      borderRadius={borderRadius}
      {...props}
    >
      {children}
    </StyledCard>
  );
}

export default Card;
