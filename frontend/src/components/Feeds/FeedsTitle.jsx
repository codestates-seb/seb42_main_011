import React from 'react';
import styled from 'styled-components';
import HomeLogo from '../../assets/logo/home_logo.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: var(--color-light-0);
  z-index: 99;
  padding-bottom: 16px;
`;

const Title = styled.h2`
  position: relative;
  height: 85px;
  padding: 24px 55px;
`;

const LogoImage = styled.img`
  position: absolute;
  width: 170px;
  height: 130px;
`;

const PageDescription = styled.p`
  font-size: var(--font-size-20);
  line-height: var(--line-height-20);
  font-weight: 500;
  z-index: 99;
  padding-left: 87px;
  padding-top: 32px;
`;

function FeedsTitle({ title, description }) {
  return (
    <Container>
      <Title>
        <LogoImage src={HomeLogo} alt={title} />
      </Title>
      <PageDescription>{description}</PageDescription>
    </Container>
  );
}

export default FeedsTitle;
