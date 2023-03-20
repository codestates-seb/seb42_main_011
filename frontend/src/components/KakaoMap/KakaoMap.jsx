/* global kakao */
import { useEffect } from 'react';
import styled from 'styled-components';

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
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      const overlayContent = `<div style="background-color: var(--color-light-0); color:var(--color-dark-0); margin: 10px; padding:10px; font-size: 15px; border-radius:5px; box-shadow: 2px 2px #666666; border:var(--border)">
      ${place.place_name}
    </div>
      `;

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
