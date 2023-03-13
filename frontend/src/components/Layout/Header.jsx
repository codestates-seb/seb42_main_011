import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../UI/Button';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  border-bottom: var(--border);
  position: sticky;
  z-index: 10;
`;

const Nav = styled.nav`
  height: 70px;
  border-bottom: var(--border);
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const Logo = styled.img`
  width: 170px;
  height: 58px;
  margin: 11px 0 2px 23px;
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  width: 254px;
  height: 29px;
  margin: 21px 0;
`;

const MenuButton = styled.div``;

const MenuUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 29px;
`;

const Menu = styled.li`
  font-size: var(--font-size-20);
  font-weight: 500;
  &:hover {
    color: var(--color-tertiary);
    cursor: pointer;
  }
`;

const Login = styled(Button)`
  border-left: var(--border);
  border-bottom: var(--border);
  color: var(--color-dark-0);
  &:hover {
    border-left: var(--border);
    border-bottom: var(--border);
    cursor: pointer;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Nav>
        <Link to="/">
          <h1>
            <Logo src="./images/logo.svg" alt="my buddy logo" />
          </h1>
        </Link>
        <MenuWrapper>
          <MenuUl>
            <Menu>홈</Menu>
            <Menu>친구찾기</Menu>
            <Menu>추천장소</Menu>
          </MenuUl>
        </MenuWrapper>
        <MenuButton>
          <Link to="/login">
            <Login variant="headersecondary">로그인</Login>
          </Link>
        </MenuButton>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
