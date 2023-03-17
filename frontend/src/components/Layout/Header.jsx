import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../UI/Button';
import { ReactComponent as MainLogo } from '../../assets/logo/logo.svg';

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

const Logo = styled(MainLogo)`
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

/* 나중에 조건부 렌더링 위해 남겨둠 */
const MenuButtonWrapper = styled.div``;

const MenuUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 29px;
`;

const LinkStyle = styled.li`
  .selected {
    color: var(--color-tertiary);
    font-weight: bold;
  }
`;

const Menu = styled.div`
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
            <Logo />
          </h1>
        </Link>
        <MenuWrapper>
          <MenuUl>
            <LinkStyle>
              <NavLink
                end
                className={({ isActive }) => (isActive ? 'selected' : '')}
                to="/"
              >
                <Menu>홈</Menu>
              </NavLink>
            </LinkStyle>
            <LinkStyle>
              <NavLink
                end
                className={({ isActive }) => (isActive ? 'selected' : '')}
                to="/friend"
              >
                <Menu>친구찾기</Menu>
              </NavLink>
            </LinkStyle>
            <Menu>추천장소</Menu>
          </MenuUl>
        </MenuWrapper>
        <MenuButtonWrapper>
          <Link to="/login">
            <Login variant="headersecondary">로그인</Login>
          </Link>
        </MenuButtonWrapper>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
