import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const UserTab = styled.div`
  width: 100%;
  height: 50px;
  background-color: var(--color-light-0);
  border: var(--border);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Tabmenu = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  width: 100%;
`;

const LinkStyle = styled.li`
  width: 34%;
  height: 48px;
  font-weight: 500;
  text-align: center;
  line-height: 45px;
  border-right: var(--border);
  &:hover {
    color: var(--color-light-0);
    background-color: var(--color-dark-2);
  }
  &:last-child {
    border-right: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .selected {
    display: block;
    color: var(--color-light-0);
    background-color: var(--color-primary);
    text-align: center;
    line-height: 45px;
  }
`;
const Menu = styled.div`
  display: inline-block;
  width: 100%;
  height: 48px;
  font-weight: 500;
  text-align: center;
  line-height: 45px;
  border-right: var(--border);

  &:last-child {
    border-right: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

function UserTabMenu({ memberId }) {
  return (
    <UserTab>
      <Tabmenu>
        <LinkStyle>
          <NavLink
            end
            className={({ isActive }) => (isActive ? 'selected' : '')}
            to={`/user/${memberId}`}
          >
            <Menu>소개</Menu>
          </NavLink>
        </LinkStyle>
        <LinkStyle>
          <NavLink
            end
            className={({ isActive }) => (isActive ? 'selected' : '')}
            to={`/user/${memberId}/feed`}
          >
            <Menu>일기</Menu>
          </NavLink>
        </LinkStyle>
        <LinkStyle>
          <NavLink
            end
            className={({ isActive }) => (isActive ? 'selected' : '')}
            to={`/user/${memberId}/place`}
          >
            <Menu>추천</Menu>
          </NavLink>
        </LinkStyle>
      </Tabmenu>
    </UserTab>
  );
}

export default UserTabMenu;
