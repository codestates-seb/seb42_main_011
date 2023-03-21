import React from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal/Modal';
import LocationLogo from '../../assets/logo/location_logo.svg';
import Button from '../UI/Button';
import DropdownLocation from '../UI/Dropdown/DropdownLocation';

const LocationDropdown = styled.div`
  width: 100%;
  line-height: 40px;
  font-weight: 500;
  margin: 80px 0 100px;
  text-align: center;
`;

const SubmitBtn = styled(Button)`
  background-color: var(--color-primary);
  margin-left: 60px;
  &:hover {
    background-color: var(--color-primary);
  }
`;

function LocationModal() {
  return (
    <Modal titleImage={LocationLogo}>
      <LocationDropdown>
        <DropdownLocation />
        <DropdownLocation />
      </LocationDropdown>
      <SubmitBtn variant="medium">완료</SubmitBtn>
    </Modal>
  );
}

export default LocationModal;
