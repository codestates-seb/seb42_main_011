import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as IconSearch } from '../../assets/icons/icon-search.svg';

const SearchWrapper = styled.div`
  width: 400px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-secondary);
`;

const SearchForm = styled.form`
  background-color: white;
  border-radius: 10px;
  width: 380px;
  padding: 6px;

  height: 45px;

  display: flex;
  align-items: center;

  font-size: 14px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 3px;
`;

const Button = styled.button`
  color: var(--color-dark-2);
  width: 36px;
  height: 36px;
`;

const SearchIcon = styled(IconSearch)`
  width: 20px;
  height: 20px;
`;

function PostNewPlaceSearch({ onSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = event => {
    const text = event.target.value;
    setKeyword(text);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(keyword);
  };

  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          onChange={handleChange}
          type="text"
          value={keyword}
          name="keyword"
          size="15"
          placeholder="장소 검색하기"
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </SearchForm>
    </SearchWrapper>
  );
}

export default PostNewPlaceSearch;
