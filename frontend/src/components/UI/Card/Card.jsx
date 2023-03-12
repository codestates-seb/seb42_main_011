import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  border: 1.5px solid var(--black);
  border-radius: ${({ borderRadius }) => borderRadius};
  background: var(--white);
`;

function Card({ borderRadius = '10px', children, ...props }) {
  return (
    <StyledCard borderRadius={borderRadius} {...props}>
      {children}
    </StyledCard>
  );
}

export default Card;
