import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as IconDown } from '../../../assets/icons/icon-down.svg';

const VARIANTS = {
  primary: css`
    --dropdown-color: var(--color-dark-0);
    --dropdown-bg-color: var(--color-light-1);
    --dropdown-button-bg-color: var(--color-light-1);
    --dropdown-hover-color: var(--color-light-0);
    --dropdown-hover-bg-color: var(--color-dark-0);
  `,
  secondary: css`
    --dropdown-color: var(--color-dark-0);
    --dropdown-bg-color: var(--color-light-1);
    --dropdown-button-bg-color: var(--color-light-1);
    --dropdown-hover-color: var(--color-dark-0);
    --dropdown-hover-bg-color: var(--color-dark-3);

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `,
  tertiary: css`
    --dropdown-color: var(--color-dark-0);
    --dropdown-bg-color: var(--color-light-0);
    --dropdown-button-bg-color: var(--color-light-2);
    --dropdown-hover-color: var(--color-dark-0);
    --dropdown-hover-bg-color: var(--color-dark-3);
  `,
};

const SIZES = {
  lz: css`
    --dropdown-width: 100%;
    --dropdown-height: 50px;
    --dropdown-font-size: var(--font-size-16);
    --dropdown-padding: 15px;
  `,
  md: css`
    --dropdown-width: 130px;
    --dropdown-height: 30px;
    --dropdown-font-size: var(--font-size-13);
    --dropdown-padding: 10px;
  `,
  sm: css`
    --dropdown-width: 91px;
    --dropdown-height: 30px;
    --dropdown-font-size: var(--font-size-13);
    --dropdown-padding: 3px;
  `,
};

const DropdownListItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: var(--dropdown-width);
  height: var(--dropdown-height);

  &:hover {
    color: var(--dropdown-hover-color);
    background-color: var(--dropdown-hover-bg-color);
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  ${({ isDisplayBorder }) =>
    isDisplayBorder &&
    css`
      border-left: var(--border);
      border-right: var(--border);
      border-bottom: var(--border);
    `}
`;

const DropdownList = styled.ul`
  background-color: white;
  text-align: inherit;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: var(--dropdown-width);
  box-shadow: inherit;
`;

const SelectedOption = styled.p`
  flex: 1 1 0;
`;

const DropdownButton = styled.button.attrs({
  type: 'button',
})`
  background-color: var(--dropdown-button-bg-color);
  color: var(--dropdown-color);
  border: ${({ isDisplayBorder }) => (isDisplayBorder ? 'var(--border)' : '')};
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;

  width: var(--dropdown-width);
  height: var(--dropdown-height);

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
  ${({ variant }) => VARIANTS[variant]}
  ${({ size }) => SIZES[size]}

  position: relative;
  display: inline-block;
  font-size: var(--dropdown-font-size);

  ${({ itemTextAlign }) =>
    ({
      left: css`
        ${DropdownListItem}, ${DropdownButton} {
          justify-content: flex-start;
          text-align: left;
          padding: 0 var(--dropdown-padding);
        }
      `,
      center: css`
        ${DropdownListItem}, ${DropdownButton} {
          justify-content: center;
          text-align: center;
          padding-right: var(--dropdown-padding);
        }
      `,
    }[itemTextAlign])};
`;

function Dropdown({
  options,
  onSelect,
  itemTextAlign = 'left',
  defaultDlsplayText = '선택하세요',
  variant = 'primary',
  size = 'lz',
  isDisplayBorder = true,
  labelText,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultDlsplayText);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = event => {
    const { dropdownOption } = event.target.closest('li').dataset;

    if (!dropdownOption) {
      return;
    }

    setSelectedOption(dropdownOption);
    setIsOpen(false);
    onSelect(dropdownOption);
  };
  
  const Label = styled.span`
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  `;

  return (
    <DropdownContainer
      itemTextAlign={itemTextAlign}
      variant={variant}
      size={size}
    >
      <Label>{labelText}</Label>
      <DropdownButton
        isDisplayBorder={isDisplayBorder}
        isOpen={isOpen}
        onClick={handleDropdownToggle}
      >
        <SelectedOption>{selectedOption}</SelectedOption>
        <IconDown />
      </DropdownButton>
      {isOpen && (
        <DropdownList onClick={handleOptionSelect}>
          {options.map(option => (
            <DropdownListItem
              isDisplayBorder={isDisplayBorder}
              key={option}
              data-dropdown-option={option}
            >
              {option}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default Dropdown;
