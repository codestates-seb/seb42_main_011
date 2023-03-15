import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MybuddyLogo } from '../assets/logo/logo_navy.svg';

const LoginWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;
const LoginComponent = styled.div`
  flex-grow: 2;
  width: 55vw;
  padding: 20px 53px;
  position: relative;
  @media screen and (max-height: 700px) {
    height: 573px;
  }
  @media screen and (min-height: 701px) {
    height: calc(100vh - 133px);
  }
`;

const ImageWrapper = styled.aside`
  flex-grow: 0;
  position: relative;
  width: 45vw;
  display: flex;
  flex-direction: column;
`;
const BackgroundImage = styled.img`
  width: 100%;
  @media screen and (max-height: 700px) {
    height: 573px;
  }
  @media screen and (min-height: 701px) {
    height: calc(100vh - 133px);
  }
  object-fit: cover;
  flex-grow: 1;
`;

const ImageLogo = styled(MybuddyLogo)`
  width: 40%;
  height: 20%;
  position: absolute;
  top: 40%;
  left: 33%;
`;

const MainLogo = styled(MybuddyLogo)`
  width: 160px;
  height: 100px;
  filter: drop-shadow(0px 3px 2px var(--color-dark-0));
`;

function ImagePage() {
  return (
    <LoginWrapper>
      <LoginComponent>
        <Link to="/">
          <MainLogo />
        </Link>
        <Outlet />
      </LoginComponent>
      <ImageWrapper>
        <BackgroundImage
          src="./images/mybuddy_background_nologo.svg"
          alt="마이버디 배경"
        />
        <ImageLogo />
      </ImageWrapper>
    </LoginWrapper>
  );
}

export default ImagePage;