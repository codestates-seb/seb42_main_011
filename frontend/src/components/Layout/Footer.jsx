import React from 'react';
import styled from 'styled-components';

const FooterComponent = styled.footer`
  width: 100%;
  color: var(--color-light-0);
  background-color: var(--color-dark-0);
  text-align: center;
  line-height: 8px;
  padding: 20px 0 8px;
  font-size: var(--font-size-13);
  font-weight: 500;

  height: 54px;
  transform: translateZ(1rem);
`;

function Footer() {
  return (
    <FooterComponent>
      Copyright 2023 MY BUDDY All rights reserved.
    </FooterComponent>
  );
}

export default Footer;
