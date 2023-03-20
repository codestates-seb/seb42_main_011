import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
import KakaoMap from './KakaoMap';
import Modal from '../UI/Modal/Modal';
import SearchLogo from '../../assets/logo/location_search_logo.svg';
import ModalContext from '../../context/ModalContext';

const LocationDropdown = styled.div`
  width: 100%;
  line-height: 40px;
  font-weight: 500;
  margin: 80px 0 100px;
  text-align: center;
`;
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

function SearchModal() {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  const { closeModal } = useContext(ModalContext);

  useEffect(() => {
    if (place) {
      closeModal();
    }
  }, [place, closeModal]);

  const onChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPlace(inputText);
  };

  return (
    <Modal titleImage={SearchLogo}>
      <LocationDropdown>
        <Search>
          <form className="inputForm" onSubmit={handleSubmit}>
            <figcaption>키워드나 주소를 검색해보세요!</figcaption>
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
          {place && <KakaoMap searchPlace={place} />}
        </Search>
      </LocationDropdown>
    </Modal>
  );
}

export default SearchModal;
