import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as IconDown } from '../../../assets/icons/icon-down.svg';
import useDropdown from '../../../hooks/useDropdown';

const DropdownListItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 130px;
  height: 30px;

  &:hover {
    color: var(--color-light-0);
    background-color: var(--color-dark-3);
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }
`;

const DropdownList = styled.ul`
  background-color: var(--color-light-0);
  text-align: inherit;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 130px;
  box-shadow: inherit;
`;

const SelectedOption = styled.p`
  flex: 1 1 0;
`;

const DropdownButton = styled.button`
  background-color: var(--color-light-1);
  color: var(--color-dark-0);
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
  width: 130px;
  height: 30px;

  svg {
    transform: rotate(0deg);
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      border-radius: 5px 5px 0 0;
      svg {
        transform: rotate(180deg);
      }
    `}
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  font-size: var(--font-size-13);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  ${DropdownListItem}, ${DropdownButton} {
    justify-content: center;
    text-align: center;
    padding-right: 15px;
  }
`;

function DropdownLocation({
  options,
  onSelect,
  defaultDlsplayText = '선택하세요',
}) {
  const [isOpen, selectedOption, handleDropdownToggle, handleOptionSelect] =
    useDropdown({
      onSelect,
      defaultDlsplayText,
    });

  return (
    <DropdownContainer>
      <DropdownButton isOpen={isOpen} onClick={handleDropdownToggle}>
        <SelectedOption>{selectedOption}</SelectedOption>
        <IconDown />
      </DropdownButton>
      {isOpen && (
        <DropdownList onClick={handleOptionSelect}>
          {options.map(option => (
            <DropdownListItem>{option}</DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default DropdownLocation;
