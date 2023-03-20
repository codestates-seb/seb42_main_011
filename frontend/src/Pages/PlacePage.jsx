import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as PlaceShape } from '../assets/shape/place_shape.svg';
import PlaceHeader from '../components/Place/PlaceHeader';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import Button from '../components/UI/Button';
import ModalContext from '../context/ModalContext';
import LocationModal from '../components/KakaoMap/LocationModal';
import SearchModal from '../components/KakaoMap/SearchModal';

const Container = styled.article`
  width: 100%;
  height: 100%;
`;

const PlaceOrangeShape = styled(PlaceShape)`
  position: fixed;
  top: 140px;
  right: 90px;
  transform: scale(1.3);
  -webkit-transform: scale(1.3);
`;

const PlaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
`;

const MapContainer = styled.div`
  padding: 0 90px;
  height: 100%;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  margin: -15px 0px 10px;
  width: 100%;
`;

const LocationBtn = styled(Button)`
  margin-right: 10px;
  &:hover {
    background-color: var(--color-tertiary);
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 56vh;
  min-height: 100px;
  max-height: 590px;
  overflow-y: auto;
`;

function PlaceSearchPage() {
  const { showModal, openModal } = useContext(ModalContext);
  const [modalType, setModalType] = useState('');

  const toggleModal = type => {
    setModalType(type);
    openModal();
  };
  return (
    <Container>
      <PlaceHeader />
      <PlaceWrapper>
        <MapContainer>
          <PlaceOrangeShape />
          <ContentWrapper>
            <ButtonWrapper>
              <LocationBtn onClick={() => toggleModal('location')}>
                장소변경
              </LocationBtn>
              <Button onClick={() => toggleModal('search')}>키워드 검색</Button>
            </ButtonWrapper>
            <MapWrapper>
              <KakaoMap />
            </MapWrapper>
          </ContentWrapper>
        </MapContainer>
        {showModal && modalType === 'location' && <LocationModal />}
        {showModal && modalType === 'search' && <SearchModal />}
      </PlaceWrapper>
    </Container>
  );
}

export default PlaceSearchPage;
