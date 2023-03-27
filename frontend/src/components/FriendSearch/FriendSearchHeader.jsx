import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import PostHeader from '../UI/PostHeader';
import DropdownFriend from '../UI/Dropdown/DropdownFriend';
import SearchInput from '../UI/SearchInput/SearchInput';
import useInputs from '../../hooks/useInputs';

import FriendLogo from '../../assets/logo/frined_logo.svg';

const FriendSearchWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 800px;
`;

const FriendSearchForm = styled.form`
  position: sticky;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  width: 40%;
  z-index: 10;
`;

const FriendSearchInput = styled(SearchInput)`
  height: 50px;
  width: 100%;
`;

const SEARCH_OPTIONS = [
  { name: '닉네임', value: 'nickname' },
  { name: '강아지 이름', value: 'dogName' },
];

function FriendSearchHeader({ initialName = '', initialType = '' }) {
  const [{ searchName }, onChange] = useInputs({
    searchName: initialName,
  });
  const [searchType, setSearchType] = useState(initialType);
  const naviate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    return false;
  };

  const handleKeyDown = event => {
    if (searchType.length === 0 || searchName.length === 0) {
      return;
    }

    if (event.key === 'Enter') {
      naviate(
        `/friend/search?searchType=${searchType}&searchName=${searchName}`,
      );
    }
  };

  const handleSelect = selectOption => {
    setSearchType(selectOption);
  };

  return (
    <PostHeader
      title="friend find"
      img={FriendLogo}
      description="친구들의 피드를 확인해보세요!"
    >
      <FriendSearchWrapper>
        <FriendSearchForm onSubmit={handleSubmit}>
          <FriendSearchInput
            value={searchName}
            onKeyDown={handleKeyDown}
            name="searchName"
            id="searchName"
            placeholder="검색"
            onChange={onChange}
            required
          />
          <DropdownFriend
            onSelect={handleSelect}
            defaultDlsplayText="필터"
            options={SEARCH_OPTIONS}
          />
        </FriendSearchForm>
      </FriendSearchWrapper>
    </PostHeader>
  );
}

export default FriendSearchHeader;