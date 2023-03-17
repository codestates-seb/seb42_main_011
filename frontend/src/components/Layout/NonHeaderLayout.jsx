import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ImagePage from '../../Pages/ImagePage';
import Footer from './Footer';
// import Header from './Header';

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
  height: calc(100vh - 70px);
`;

const InnerFrame = styled.div`
  background-color: var(--color-light-0);
  width: calc(100vw - 100px);
  height: calc(100vh - 130px);
  border: var(--border);
  border-radius: 10px;
  overflow: hidden;
  ${({ displayFlex }) =>
    displayFlex &&
    css`
      display: flex;
      justify-content: center;
    `}
  overflow-y: auto;
`;

function NonHeaderLayout({
  displayBgimg = false,
  displayFlex = false,
}) {
  return (
    <Wrapper>
      <Container>
        <Frame>
          <InnerFrame displayFlex={displayFlex}>
            {displayBgimg ? <ImagePage /> : <Outlet />}
          </InnerFrame>
        </Frame>
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default NonHeaderLayout;
