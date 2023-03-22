/* global kakao */
import { useEffect } from 'react';
import styled from 'styled-components';
import dummyData from '../Place/LocationDummy';
import newMarker from '../../assets/marker.svg';
import memo from '../../assets/memo_image.svg';
/* import popupBg from '../../assets/popup_bg.svg'; */

const Map = styled.div`
  border: var(--border);
`;

/* const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
  background: url(${popupBg}) no-repeat center;
  text-align: center;
  z-index: 10;
  font-weight: 500;
  line-height: 35px;
  padding: 95px 25px 0px 0px;
  font-size: var(--font-size-20);
`; */

function MapContainer({ selectedState, selectedRegion }) {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const DEFAULT_LOCATION = new kakao.maps.LatLng(
      37.576030700103,
      126.97672186606,
    );
    const options = {
      center: DEFAULT_LOCATION,
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    const data = dummyData.data[0].data.filter(item => {
      const addressParts = item.address.split(' ');
      return (
        addressParts.length >= 2 &&
        addressParts[0] === selectedState &&
        addressParts[1] === selectedRegion
      );
    });
    if (data.length === 0) {
      map.setCenter(DEFAULT_LOCATION);
      /*  alert('아직 이 지역에는 추천 장소가 없네요! 다른 지역을 찾아보세요! :)'); */
      return;
    }

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

      const overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        map,
        position: new kakao.maps.LatLng(place.latitude, place.longitude),
        yAnchor: 1.5,
      });
      overlay.setPosition(
        new kakao.maps.LatLng(place.latitude, place.longitude),
      );
      overlay.setMap(map);

      kakao.maps.event.addListener(marker, 'click', () => {
        window.open(place.place_url, '_blank');
      });
    }

    const bounds = new kakao.maps.LatLngBounds();
    data.forEach(place => {
      displayMarker(place);
      bounds.extend(new kakao.maps.LatLng(place.latitude, place.longitude));
    });

    map.setBounds(bounds);
  }, [selectedState, selectedRegion]);

  return (
    <Map
      id="myMap"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}

export default MapContainer;
