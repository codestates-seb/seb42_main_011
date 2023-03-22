import React from 'react';
import styled from 'styled-components';

import { StyleScrollNone } from '../../styles/shared';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 64px);
  background-color: var(--color-dark-3);
  opacity: 0.85;

  overflow-y: auto;
  ${StyleScrollNone}
`;

const Item = styled.li`
  padding: 6px 12px;
  border: 1px solid var(--color-dark-2);
  width: 100%;
  min-height: 60px;
  display: flex;

  &:hover {
    background-color: var(--color-dark-2);
  }
`;

const ItemInfo = styled.div`
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemPlace = styled.p`
  width: 100%;
  font-weight: 500;
  font-size: 16px;
`;

const ItemRoadAddress = styled.p`
  width: 100%;
  font-size: 12px;
`;

const ItemPhone = styled.p`
  width: 100%;
  font-size: 12px;
`;

const SelecteButton = styled.button`
  border: 1px solid var(--color-dark-2);
  background-color: var(--color-light-0);
  width: 60px;
  height: 32px;
`;

function PostNewPlaceList({
  markers,
  onClick,
  onMouseOver,
  onMouseOut,
  onSelect,
}) {
  const getTargetIdx = event => {
    if (event.target.tagName === 'button') {
      return undefined;
    }
    const $div = event.target.closest('div');

    if (!$div) {
      return undefined;
    }

    const { idx } = $div.dataset;

    return idx;
  };

  const handleClick = event => {
    const idx = getTargetIdx(event);

    if (idx) {
      onClick(idx);
    }
  };

  const handleMouseOver = event => {
    const idx = getTargetIdx(event);

    if (idx) {
      onMouseOver(idx);
    }
  };

  const handleMouseOut = event => {
    const idx = getTargetIdx(event);

    if (idx) {
      onMouseOut();
    }
  };

  const handleSelectClick = event => {
    const { idx } = event.target.dataset;

    if (idx) {
      onSelect(idx);
    }
  };

  return (
    <List>
      {markers.map(({ place }, index) => (
        <Item key={place.id}>
          <ItemInfo
            data-idx={index}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {place.place_name.length > 0 && (
              <ItemPlace>{place.place_name}</ItemPlace>
            )}
            {place.address_name.length > 0 && (
              <ItemRoadAddress>{place.address_name}</ItemRoadAddress>
            )}
            {place.phone.length > 0 && <ItemPhone>({place.phone})</ItemPhone>}
          </ItemInfo>
          <SelecteButton data-idx={index} onClick={handleSelectClick}>
            선택
          </SelecteButton>
        </Item>
      ))}
    </List>
  );
}

export default PostNewPlaceList;
