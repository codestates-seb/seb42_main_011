import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MybuddyLogo } from '../assets/logo/logo_navy.svg';
import MybuddyBackground from "../assets/mybuddy_background_nologo.svg";

const ImagePageWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;

const InputComponent = styled.div`
  flex-grow: 2;
  width: 55vw;
  padding: 20px 53px;
  position: relative;
`;

const ImageWrapper = styled.aside`
  @media screen and (max-width: 800px) {
    display: none;
  }
  flex-grow: 0;
  position: relative;
  width: 45vw;
  display: flex;
  flex-direction: column;
`;

const BackgroundImage = styled.img`
  width: 100%;
  object-fit: cover;
  flex-grow: 1;
  height: calc(100vh - 133px);
  object-fit: cover;
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
    <ImagePageWrapper>
      <InputComponent>
        <Link to="/">
          <h2>
            <MainLogo />
          </h2>
        </Link>
        <Outlet />
      </InputComponent>
      <ImageWrapper>
        <BackgroundImage
          src={MybuddyBackground}
          alt="마이버디 배경"
        />
        <ImageLogo />
      </ImageWrapper>
    </ImagePageWrapper>
  );
}

export default ImagePage;
