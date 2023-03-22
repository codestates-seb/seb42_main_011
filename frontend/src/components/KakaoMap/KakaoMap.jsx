/* global kakao */
import { useEffect } from 'react';
import styled from 'styled-components';
import newMarker from '../../assets/marker.svg';
import memo from '../../assets/memo_image.svg';

const Map = styled.div`
  border: var(--border);
`;

function MapContainer({ searchPlace }) {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.576030700103, 126.97672186606),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    function displayMarker(place) {
      const imageSize = new kakao.maps.Size(40, 40);
      const markerImage = new kakao.maps.MarkerImage(newMarker, imageSize);
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x),
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
  ${place.place_name}
</div>`;

      const overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        map,
        position: new kakao.maps.LatLng(place.y, place.x),
        yAnchor: 1.5,
      });
      overlay.setMap(map);

      kakao.maps.event.addListener(marker, 'click', () => {
        window.open(place.place_url, '_blank');
      });
    }
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i += 1) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }
    ps.keywordSearch(searchPlace, placesSearchCB);
  }, [searchPlace]);

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
