/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ImagePage from '../../Pages/ImagePage';
import UserPage from '../../Pages/UserPage';
import Footer from './Footer';
import Header from './Header';

const Wrapper = styled.div`
  width: 100%;
  @media screen and (max-height: 700px) {
    height: 700px;
  }
  @media screen and (min-height: 701px) {
    height: 100vh;
  }
  background-color: var(--color-dark-0);
  padding: 20px 20px 13px 20px;
  display: flex;
  flex-direction: column;
  
`;

const Container = styled.div`
  display: flex;
  background-color: var(--color-light-2);
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  flex-grow: 1;
  flex-direction: column;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 30px;
`;

const InnerFrame = styled.div`
  flex-grow: 1;
  width: 100%;
  background-color: var(--color-light-0);
  border: var(--border);
  border-radius: 30px;
  overflow: hidden;
  ${({ displayFlex }) =>
    displayFlex &&
    css`
      display: flex;
      justify-content: center;
    `}
`;

function Layout({
  displayHeader = false,
  displayBgimg = false,
  displayProfile = false,
  displayFlex = false,
}) {
  return (
    // <FlexWrapper>
      <Wrapper>
        <Container>
          {displayHeader && <Header />}
          <Frame>
            <InnerFrame displayFlex={displayFlex}>
              {displayProfile && <UserPage />}
              {displayBgimg ? <ImagePage /> : <Outlet />}
            </InnerFrame>
          </Frame>
        </Container>
        <Footer />
      </Wrapper>
    // </FlexWrapper>
  );
}


export default Layout;
