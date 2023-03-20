import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
import KakaoMap from './KakaoMap';

const Search = styled.div`
  width: 300px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  border: var(--border);
  border-radius: 5px;
  width: 300px;
  padding: 15px;
  margin-bottom: 50px;
`;

function SearchPlace({ onClose = () => {} }) {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');

  const handleClose = () => {
    onClose();
    setInputText('');
  };

  const onChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPlace(inputText);
    handleClose();
  };

  return (
    <Search>
      <form className="inputForm" onSubmit={handleSubmit}>
        <SearchInput
          placeholder="검색해주세요!"
          onChange={onChange}
          value={inputText}
          required
        />
        <Button variant="medium" type="submit">
          검색
        </Button>
      </form>
      <KakaoMap searchPlace={place} />
    </Search>
  );
}

export default SearchPlace;
