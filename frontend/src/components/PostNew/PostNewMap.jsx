import React, { useRef } from 'react';
import styled from 'styled-components';
import useMap from '../../hooks/useMap';

import PostNewPlaceList from './PostNewPlaceList';
import PostNewPlaceHeader from './PostNewPlaceHeader';
import PostNewPlaceSearch from './PostNewPlaceSearch';

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

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: var(--color-light-0);
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

function PostNewMap({ onSelect, onClose }) {
  const mapRef = useRef();

  const { moveLocation, markers, searchPlaces, displayInfowindow, infowindow } =
    useMap({
      mapRef,
      centerX: '37.566826',
      centerY: '126.9786567',
    });

  const handleSubmit = keyword => {
    searchPlaces({ keyword });
  };

  const handleClick = idx => {
    const { x, y } = markers[idx].place;

    moveLocation({ x, y });
  };

  const handleMouseOver = idx => {
    const { place } = markers[idx];
    const { marker } = markers[idx];

    if (place && marker) {
      displayInfowindow(marker, place.place_name);
      const { x, y } = place;
      moveLocation({ x, y });
    }
  };

  const handleMouseOut = () => {
    infowindow.close();
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
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onSelect={handleSelectClick}
        />
      </ContentContainer>
    </Container>
  );
}

export default PostNewMap;
