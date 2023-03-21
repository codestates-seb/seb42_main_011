import React from 'react';
import styled from 'styled-components';

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

function FriendSearchTitle({ searchOptions, onSearch }) {
  const [form, onChange, reset] = useInputs({
    search: '',
  });

  const handleSubmit = event => {
    if (event.key === 'Enter') {
      onSearch({ searchValue: form.search });
      reset();
    }
  };

  return (
    <PostHeader
      title="friend find"
      img={FriendLogo}
      description="친구들의 피드를 확인해보세요!"
    >
      <FriendSearchWrapper>
        <FriendSearchForm>
          <FriendSearchInput
            onKeyDown={handleSubmit}
            name="search"
            id="search"
            placeholder="검색"
            onChange={onChange}
          />
          <DropdownFriend defaultDlsplayText="필터" options={searchOptions} />
        </FriendSearchForm>
      </FriendSearchWrapper>
    </PostHeader>
  );
}

export default FriendSearchTitle;
