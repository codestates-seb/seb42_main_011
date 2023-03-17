import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as IconMan } from '../../../assets/icons/icon-man.svg';
import { ReactComponent as IconWoman } from '../../../assets/icons/icon-woman.svg';
import { ReactComponent as IconDown } from '../../../assets/icons/icon-down.svg';
import useDropdown from '../../../hooks/useDropdown';

const IconStyle = css`
  color: var(--color-tertiary);
`;

const Man = styled(IconMan)`
  ${IconStyle}
  width: 22px;
  height: 22px;
`;

const Woman = styled(IconWoman)`
  ${IconStyle};
  width: 18px;
  height: 25px;
`;

const Down = styled(IconDown)``;

const DropdownListItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  /* width: 605px; */
  @media screen and (min-height: 1050px){
    height: 50px;
  }
  @media screen and (min-width: 1174px){
    width: 480px;
  }
  min-height: 40px;

  &:hover {
    color: var(--color-light-0);
    background-color: var(--color-dark-0);

    ${Man}, ${Woman} {
      color: var(--color-light-0);
    }
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
`;

const DropdownList = styled.ul`
  background-color: var(--color-light-0);
  text-align: inherit;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  /* width: 605px; */
  @media screen and (min-height: 1050px){
    height: 50px;
  }
  @media screen and (min-width: 1174px){
    width: 480px;
  }
  box-shadow: inherit;
`;

const SelectedOption = styled.p`
  flex: 1 1 0;
`;

const DropdownButton = styled.button`
  background-color: var(--color-light-1);
  color: var(--color-dark-0);
  border: var(--border);
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 40px;
  min-height: 35px;

  ${Down} {
    transform: rotate(0deg);
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      border-radius: 5px 5px 0 0;

      ${Down} {
        transform: rotate(180deg);
      }
    `}
`;

const DropdownContainer = styled.div`
  flex-grow: 1;
  position: relative;
  display: inline-block;
  font-size: var(--font-size-16);

  ${DropdownListItem}, ${DropdownButton} {
    justify-content: flex-start;
    text-align: left;
    padding: 0 15px;
  }
  min-height: 40px;
  @media screen and (min-height: 1050px){
    height: 50px;
  }
  @media screen and (min-width: 1174px){
    width: 480px;
  }
`;

const DropdownLabel = styled.div`
  color: var(--color-dark-0);
  font-weight: 700;
  margin-bottom: 10px;
`;

function DropdownGender({ onSelect, defaultDlsplayText = '선택하세요' }) {
  const [isOpen, selectedOption, handleDropdownToggle, handleOptionSelect] =
    useDropdown({
      onSelect,
      defaultDlsplayText,
    });

  return (
    <DropdownContainer>
      <DropdownLabel>강아지 성별</DropdownLabel>
      <DropdownButton isOpen={isOpen} onClick={handleDropdownToggle}>
        <SelectedOption>
          {{
            man: <Man />,
            woman: <Woman />,
          }[selectedOption] || selectedOption}
        </SelectedOption>
        <Down />
      </DropdownButton>
      {isOpen && (
        <DropdownList onClick={handleOptionSelect}>
          <DropdownListItem data-dropdown-option="man">
            <Man />
          </DropdownListItem>
          <DropdownListItem data-dropdown-option="woman">
            <Woman />
          </DropdownListItem>
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default DropdownGender;
