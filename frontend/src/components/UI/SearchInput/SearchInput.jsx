import React from 'react';
import styled from 'styled-components';
// import Card from '../Card/Card';
import IconSearch from '../../../assets/icons/icon-search.svg';

const StyledSearchInput = styled.input`
  background: white url(${IconSearch}) 13px/23px no-repeat;

  padding-left: 36px;
  font-weight: 400;
  line-height: 23px;

  border: var(--border);
  border-radius: 5px;
  background-color: var(--color-light-1);
  text-indent: 10px;
`;

function SearchInput({ placeholder = '', className, ...props }) {
  return (
    <StyledSearchInput
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}

export default SearchInput;
