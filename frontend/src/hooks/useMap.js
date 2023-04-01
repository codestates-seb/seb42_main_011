import { useLayoutEffect, useState, useRef } from 'react';
import memo from '../assets/memo_image.svg';
import newMarker from '../assets/marker.svg';
import ModalBase from '../components/UI/Modal/ModalBase';
import Button from '../components/UI/Button';
import useModal from './useModal';
/* global kakao */

function useMap({ mapRef, centerX, centerY }) {
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [pages, setPages] = useState(null);
  const [ps, setPs] = useState();
  const overlayRef = useRef(null);
  const [infowindow, setInfowindow] = useState();
  const { openModal, closeModal } = useModal();

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position) {
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(newMarker, imageSize);

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
    // setMarkers([]);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다

  const handleOverlay = ({ x, y, title }) => {
    const content = `
    <div style=" background-image: url(${memo});
      background-size: cover;
      color: var(--color-dark-0);
      font-size: 13px;
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
      ${title}
    </div>`;

    const newOverlay = new kakao.maps.CustomOverlay({
      content,
      map,
      position: new kakao.maps.LatLng(y, x),
      yAnchor: 1.5,
    });

    overlayRef.current = newOverlay;
  };

  const closeOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
    }
  };

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
        closeOverlay();
        handleOverlay({ x: place.x, y: place.y, title });
      });

      kakao.maps.event.addListener(marker, 'mouseout', () => {
        closeOverlay();
      });

      return { marker, place };
    });

    map.setBounds(bounds);
    setMarkers(preState => [...preState, ...newMarkers]);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      displayPlace(data);
      setPages(pagination);
      return { data, pagination };
    }

    if (status === kakao.maps.services.Status.ZERO_RESULT) {
      openModal(
        <ModalBase
          title="결과 없음"
          content={`검색한 결과가 없습니다. `}
          isEscClose
          isFooterAnimaonClose={false}
          buttons={<Button onClick={closeModal}>확인</Button>}
        />,
      );
      return null;
    }
    if (status === kakao.maps.services.Status.ERROR) {
      openModal(
        <ModalBase
          title="서버 요청 오류"
          content="서버 요청 오류입니다. 잠시후 다시 검색해주세요."
          isEscClose
          isFooterAnimaonClose={false}
          buttons={<Button onClick={closeModal}>확인</Button>}
        />,
      );
      return null;
    }

    return null;
  }

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces({ keyword, useMapBounds = false }) {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요!');
      return false;
    }
    setMarkers([]);
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    if (useMapBounds) {
      const bounds = map.getBounds();
      ps.keywordSearch(keyword, placesSearchCB, { useMapCenter: true, bounds });
      return true;
    }

    ps.keywordSearch(keyword, placesSearchCB);
    return true;
  }

  function moveLocation({ y, x }) {
    if (map.getLevel() !== 2) {
      map.setLevel(2);
    }
    map.panTo(new kakao.maps.LatLng(y, x));
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
    handleOverlay,
    closeOverlay,
    infowindow,
    pages,
  };
}

export default useMap;
