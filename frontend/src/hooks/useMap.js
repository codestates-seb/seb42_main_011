import { useLayoutEffect, useState } from 'react';
/* global kakao */

function useMap({ mapRef, centerX, centerY }) {
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [ps, setPs] = useState();
  const [infowindow, setInfowindow] = useState();

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, idx) {
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다

    const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기

    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions,
    );

    const marker = new kakao.maps.Marker({
      position, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다

    return marker;
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    markers.map(({ marker }) => marker.setMap(null));
    setMarkers([]);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker, title) {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;

    infowindow.setContent(content);
    infowindow.open(map, marker);
  }

  function displayPlace(places) {
    const bounds = new kakao.maps.LatLngBounds();
    removeMarker();

    const newMarkers = places.map((place, i) => {
      // 마커를 생성하고 지도에 표시합니다
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, i);
      const title = places[i].place_name;

      bounds.extend(placePosition);

      kakao.maps.event.addListener(marker, 'mouseover', () => {
        displayInfowindow(marker, title);
      });

      kakao.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close();
      });

      return { marker, place };
    });

    map.setBounds(bounds);
    setMarkers(newMarkers);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      displayPlace(data);
      return { data, pagination };
    }

    if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return null;
    }
    if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return null;
    }

    return null;
  }

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces({ keyword }) {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
    return true;
  }

  function moveLocation({ y, x }) {
    map.setCenter(new kakao.maps.LatLng(y, x));
  }

  useLayoutEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const newMap = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(centerX, centerY),
      level: 3,
    });

    setMap(newMap);

    // 장소 검색 객체를 생성합니다
    setPs(new kakao.maps.services.Places());

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    setInfowindow(new kakao.maps.InfoWindow({ zIndex: 1 }));
  }, [mapRef]);

  return {
    markers,
    moveLocation,
    map,
    searchPlaces,
    displayInfowindow,
    infowindow,
  };
}

export default useMap;
