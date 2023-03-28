/* global kakao */
import { useEffect } from 'react';
import styled from 'styled-components';
import newMarker from '../../assets/marker.svg';
import memo from '../../assets/memo_image.svg';

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Map = styled.div`
  border: var(--border);
`;

const InfoText = styled.p`
  position: absolute;
  top: -20px;
  right: 0;
  z-index: 10;
  font-size: 13.5px;

  & span {
    color: var(--color-primary);
    font-weight: bold;
  }
`;

const NoData = styled.div`
  border: var(--border);
  width: 100%;
  height: 100%;
  max-height: 56vh;
  overflow: hidden;
  position: relative;
`;

const Text = styled.p`
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: var(--font-size-24);
  font-weight: 500;
  line-height: 50px;
  text-align: center;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapBgImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  scale: calc(112%);
`;

function LocationMap({ data }) {
  if (!data.data.data || !data.data.data || data.data.data.length === 0) {
    return (
      <NoData>
        <Text>
          아직 이 지역에는 친구들이 추천한 장소가 없어요! <br />
          다른 지역을 찾아보세요! :)
        </Text>
        <MapBgImg src="/images/map_bg.svg" alt="지도 이미지" />
      </NoData>
    );
  }

  const SelectData = data.data.data;
  useEffect(() => {
    const container = document.getElementById('myMap');
    const DEFAULT_LOCATION = new kakao.maps.LatLng(
      37.576030700103,
      126.97672186606,
    );
    const options = {
      center: DEFAULT_LOCATION,
      level: 3,
      draggable: true,
    };
    const map = new kakao.maps.Map(container, options);

    function displayMarker(place) {
      const imageSize = new kakao.maps.Size(40, 40);
      const markerImage = new kakao.maps.MarkerImage(newMarker, imageSize);

      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.latitude, place.longitude),
        image: markerImage,
      });

      const overlayContent = `<div style=" background-image: url(${memo});
        background-size: cover;
        color: var(--color-dark-0);
        font-size: 15px;
        width: 280px;
        height: 70px;
        display:flex;
        justify-content:center;
        align-items:center;
        margin:0px 0px 10px 5px;
        text-indent:-5px;
        padding-top: 5px;
        font-wieght:500;
        ">
      ${place.amenityName}
      </div>`;

      const contentWrapper = document.createElement('div');
      contentWrapper.innerHTML = overlayContent;

      const overlay = new kakao.maps.CustomOverlay({
        content: contentWrapper,
        map,
        position: new kakao.maps.LatLng(place.latitude, place.longitude),
        yAnchor: 1.5,
      });

      overlay.setPosition(
        new kakao.maps.LatLng(place.latitude, place.longitude),
      );
      overlay.setMap(map);

      console.log(place);
      const placeUrl = `http://place.map.kakao.com/${place.addressId}`;
      kakao.maps.event.addListener(marker, 'click', () => {
        window.open(placeUrl, '_blank');
      });

      const ammenityFeed = `/amenity/${
        place.amenityId
      }?name=${encodeURIComponent(place.amenityName)}`;
      contentWrapper.addEventListener('click', () => {
        window.open(ammenityFeed, '_target');
      });
    }

    const bounds = new kakao.maps.LatLngBounds();
    SelectData.forEach(place => {
      displayMarker(place);
      bounds.extend(new kakao.maps.LatLng(place.latitude, place.longitude));
    });

    map.setBounds(bounds);
  }, [data]);

  return (
    <MapWrapper>
      <InfoText>
        <span>마커</span>를 클릭하시면 장소 상세 페이지로,{' '}
        <span>타이틀 이미지</span>를 클릭하시면 관련 게시글로 이동해요!
      </InfoText>
      <Map
        id="myMap"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </MapWrapper>
  );
}

export default LocationMap;
