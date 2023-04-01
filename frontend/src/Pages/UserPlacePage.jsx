import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/UI/Card/Card';

const FeedPlaceWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
`;
const PlaceWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  cursor: pointer;
`;

const PlaceCard = styled(Card)`
  background-color: var(--color-light-0);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  margin-bottom: 15px;
  &:hover {
    box-shadow: 8px 8px var(--color-dark-0);
    border-radius: 10px;
  }
`;

const Place = styled.div`
  width: 20%;
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

const Title = styled.h4`
  font-size: var(--font-size-24);
  font-weight: 500;
  margin-bottom: 10px;
`;

const Address = styled.p`
  font-weight: 500;
  opacity: 0.6;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 30%;
`;

const NoDataText = styled.p`
  text-align: center;
  line-height: 3rem;
  font-size: var(--font-size-20);
  font-weight: 500;
  margin-top: 0px;
`;

function UserPlacePage({ userdata, isMyPage }) {
  const navigate = useNavigate();

  const handlePlaceClick = (amenityId, amenityName) => {
    navigate(`/amenity/${amenityId}`, { state: { amenityName } });
  };

  if (!userdata) {
    return null;
  }
  return (
    <FeedPlaceWrapper>
      <PlaceWrapper>
        {userdata?.amenityForMyPageResponseDtos?.length ? (
          userdata.amenityForMyPageResponseDtos.map(
            ({ amenityId, amenityName, address, photoUrl }) => (
              <PlaceCard
                key={amenityId}
                onClick={() => handlePlaceClick(amenityId, amenityName)}
              >
                <Place>
                  <PlaceImg
                    src={photoUrl}
                    alt={`${userdata.dogName}의 추천장소 이미지`}
                  />
                </Place>
                <PlaceInfo>
                  <Title>{amenityName}</Title>
                  <Address>{address}</Address>
                </PlaceInfo>
              </PlaceCard>
            ),
          )
        ) : (
          <TextWrapper>
            {isMyPage ? (
              <NoDataText>
                아직 추천한 장소가 없어요!
                <br />글 작성시 위치를 추가해 장소를 추천해보세요 :)
              </NoDataText>
            ) : (
              <NoDataText>
                <br />
                아직 친구가 추천한 장소가 없어요! :)
              </NoDataText>
            )}
          </TextWrapper>
        )}
      </PlaceWrapper>
    </FeedPlaceWrapper>
  );
}

export default UserPlacePage;
