import { useState } from 'react';

export default function useDropdown({
  defaultDlsplayText,
  onSelect = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultDlsplayText);

  const handleDropdownToggle = event => {
    if (event?.target.closest('button')?.type === 'submit') {
      event.preventDefault();
    }

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

  return [isOpen, selectedOption, handleDropdownToggle, handleOptionSelect];
}
