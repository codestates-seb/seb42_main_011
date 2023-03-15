import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ImagePage from '../../Pages/ImagePage';
import UserPage from '../../Pages/UserPage';
import Footer from './Footer';
import Header from './Header';

const Wrapper = styled.div`
  width: 100%;
  max-height: calc(100vh - 0px);
  background-color: var(--color-dark-0);
  padding: 20px;
`;

const Container = styled.div`
  background-color: var(--color-light-2);
  width: 100%;
  height: calc(100vh - 70px);
  margin: 0 auto;
  border-radius: 10px;
`;

const Frame = styled.div`
  width: 100%;
  max-height: calc(100vh - 124px);
  min-height: calc(100vh - 133px);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 30px;
`;

const InnerFrame = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 124px);
  min-height: calc(100vh - 200px);
  background-color: var(--color-light-0);
  border: var(--border);
  border-radius: 10px;
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
  );
}

export default Layout;
