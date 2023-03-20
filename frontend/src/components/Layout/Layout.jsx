import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import UserPage from '../../Pages/UserPage';
import Footer from './Footer';
import Header from './Header';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--color-dark-0);
  padding: 20px;
  overflow: hidden;
`;

const Container = styled.div`
  background-color: var(--color-light-2);
  width: 100%;
  height: calc(100vh - 70px);
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
`;

const Frame = styled.div`
  padding: 30px;
  height: calc(100vh - 100px);
`;

const InnerFrame = styled.div`
  background-color: var(--color-light-0);
  width: calc(100vw - 100px);
  height: 95%;
  border: var(--border);
  border-radius: 10px;
  overflow: hidden;
`;

const InnerContents = styled.div`
  height: 100%;
  padding-bottom: 170px;
  ${({ displayFlex }) =>
    displayFlex &&
    css`
      display: flex;
      justify-content: center;
    `}
`;

function Layout({
  displayHeader = false,
  displayProfile = false,
  displayFlex = false,
}) {
  return (
    <Wrapper>
      <Container>
        {displayHeader && <Header />}
        <Frame>
          <InnerFrame>
            <InnerContents displayFlex={displayFlex}>
              {displayProfile ? <UserPage /> : <Outlet />}
            </InnerContents>
          </InnerFrame>
        </Frame>
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default Layout;
