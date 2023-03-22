import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal/Modal';
import LocationLogo from '../../assets/logo/location_logo.svg';
import Button from '../UI/Button';
import DropdownLocation from '../UI/Dropdown/DropdownLocation';
import options from '../Place/location.json';
import LocationMap from './LocationMap';
import ModalContext from '../../context/ModalContext';

const LocationDropdown = styled.div`
  width: 280px;
  line-height: 40px;
  font-weight: 500;
  margin: 80px 0 100px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownWrapper = styled.div`
  margin: 10px auto;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled(Button)`
  background-color: var(--color-primary);

  &:hover {
    background-color: var(--color-primary);
  }
`;

function LocationModal({ onSelect }) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showMap, setShowMap] = useState(false);
  const { closeModal } = useContext(ModalContext);

  const filteredOptions = options.filter(
    option => option.state === selectedState,
  );
  const states = [...new Set(options.map(item => item.state))];
  const regions = [...new Set(filteredOptions.map(item => item.region))];

  const handleStateSelect = state => {
    setSelectedState(state);
    setSelectedRegion('');
  };

  const handleRegionSelect = region => {
    setSelectedRegion(region);
  };

  const handleComplete = () => {
    const location = { state: selectedState, region: selectedRegion };
    onSelect(location);
    setShowMap(true);
  };

  useEffect(() => {
    if (showMap) {
      closeModal();
    }
  }, [showMap, closeModal]);

  return (
    <Modal titleImage={LocationLogo}>
      {!showMap && (
        <form>
          <LocationDropdown>
            <DropdownWrapper>
              <DropdownLocation
                options={states}
                onSelect={handleStateSelect}
                defaultDisplayText="시/도 선택"
              />
            </DropdownWrapper>
            {selectedState && (
              <DropdownWrapper>
                <DropdownLocation
                  options={regions}
                  onSelect={handleRegionSelect}
                  defaultDisplayText="시/군/구 선택"
                />
              </DropdownWrapper>
            )}
          </LocationDropdown>
          <BtnWrapper>
            <SubmitBtn variant="medium" onClick={handleComplete}>
              완료
            </SubmitBtn>
          </BtnWrapper>
        </form>
      )}
      {showMap && (
        <LocationMap
          selectedState={selectedState}
          selectedRegion={selectedRegion}
        />
      )}
    </Modal>
  );
}

export default LocationModal;
