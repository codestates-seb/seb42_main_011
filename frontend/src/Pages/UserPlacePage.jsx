import React from 'react';
import styled from 'styled-components';
import Card from '../components/UI/Card/Card';

const FeedPlaceWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 99%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
`;
const PlaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px 0 10px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  cursor: pointer;
`;

const PlaceCard = styled(Card)`
  margin-bottom: 15px;
  &:hover {
    box-shadow: 8px 8px var(--color-dark-0);
    border-radius: 10px;
  }
  background-color: var(--color-light-0);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
`;

const Place = styled.div`
  width: 16%;
  aspect-ratio: 1/1;
  border: var(--border);
  border-radius: 10px;
  flex-grow: 1;
`;

const PlaceImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  vertical-align: top;
`;

const PlaceInfo = styled.div`
  flex-grow: 100;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: var(--font-size-24);
  font-weight: 500;
  margin-bottom: 10px;
`;

const Address = styled.p`
  font-weight: 500;
  opacity: 0.6;
`;

function UserPlacePage({ userdata }) {
  return (
    <FeedPlaceWrapper>
      {userdata.map(({ id, data }) => (
        <PlaceWrapper key={id}>
          {data.myAmenityDtos.map(({ amenityName, address, photoUrl }) => (
            <PlaceCard>
              <Place>
                <PlaceImg src={photoUrl} alt={`${data.dogName}의 게시글`} />
              </Place>
              <PlaceInfo>
                <Title>{amenityName}</Title>
                <Address>{address}</Address>
              </PlaceInfo>
            </PlaceCard>
          ))}
        </PlaceWrapper>
      ))}
    </FeedPlaceWrapper>
  );
}

export default UserPlacePage;
