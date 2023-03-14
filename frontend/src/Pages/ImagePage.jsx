import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MybuddyLogo } from '../assets/logo/logo_navy.svg';

const LoginWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 193px);
`;
const LoginComponent = styled.div`
  flex-grow: 2;
  width: 55vw;
  padding: 20px 53px;
  position: relative;
`;

const ImageWrapper = styled.aside`
  flex-grow: 0;
  position: relative;
  max-height: calc(100vh - 193px);
  min-height: 90vh;
  width: 45vw;
`;
const BackgroundImage = styled.img`
  width: 100%;
  max-height: calc(100vh - 193px);
  min-height: 90vh;
  object-fit: cover;
  vertical-align: middle;
  overflow-clip-margin: content-box;
  overflow: clip;
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