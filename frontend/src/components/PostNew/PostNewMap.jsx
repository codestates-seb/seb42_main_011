import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useMap from '../../hooks/useMap';

import PostNewPlaceList from './PostNewPlaceList';
import PostNewPlaceHeader from './PostNewPlaceHeader';
import PostNewPlaceSearch from './PostNewPlaceSearch';
import { FlexJustifyAlignCenter } from '../../styles/shared';

const MapContainer = styled.article`
  border: var(--border);
  border-radius: 5px;
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  border: var(--border);
  border-radius: 5px;

  max-width: 1163px;
  max-height: 800px;
  height: 100%;
  width: 100%;

  ${FlexJustifyAlignCenter}
  flex-direction: column;

  position: relative;
  overflow: hidden;
  background-color: var(--color-light-0);

  @media screen and (max-width: 1363px) {
    scale: calc(0.9);
  }

  @media (max-width: 1024px) {
    scale: calc(0.8);
  }

  @media (max-width: 765px) {
    scale: calc(0.7);
  }
`;

const ContentContainer = styled.section`
  border-radius: 10px;
  z-index: 299;
  top: 60px;
  left: 0;

  position: absolute;
  width: 400px;
  height: 700px;
  overflow: hidden;
`;

const CurrentLocationSearchButton = styled.button`
  position: absolute;
  bottom: 15px;
  left: 50%;
  z-index: 299;
  padding: 10px 20px;

  border-radius: 25px;
  background-color: #0475f4;
  color: var(--color-light-0);
`;

function PostNewMap({ onSelect, onClose }) {
  const mapRef = useRef();
  const [searchKeyword, setSearchKeyword] = useState(null);

  const {
    moveLocation,
    markers,
    searchPlaces,
    handleOverlay,
    closeOverlay,
    pages,
  } = useMap({
    mapRef,
    centerX: '37.566826',
    centerY: '126.9786567',
  });

  const handleSubmit = keyword => {
    searchPlaces({ keyword });
    setSearchKeyword(keyword);
  };

  const handleCurrentLocationSumbit = () => {
    searchPlaces({ keyword: searchKeyword, useMapBounds: true });
  };

  const handleClick = idx => {
    const { x, y } = markers[idx].place;
    const { place } = markers[idx];
    closeOverlay();
    handleOverlay({ x, y, title: place.place_name });
    moveLocation({ x, y });
  };

  const handleSelectClick = idx => {
    const { place } = markers[idx];

    onSelect(place);
    onClose();
  };

  return (
    <Container>
      <PostNewPlaceHeader onClose={onClose} />
      <MapContainer ref={mapRef} />

      <ContentContainer>
        <PostNewPlaceSearch onSubmit={handleSubmit} />
        <PostNewPlaceList
          markers={markers}
          onClick={handleClick}
          onSelect={handleSelectClick}
          pages={pages}
        />
      </ContentContainer>
      {searchKeyword && (
        <CurrentLocationSearchButton
          type="button"
          onClick={handleCurrentLocationSumbit}
        >
          현 위치에서 재검색
        </CurrentLocationSearchButton>
      )}
    </Container>
  );
}

export default PostNewMap;
