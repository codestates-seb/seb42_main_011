import React from 'react';
import { useLocation } from 'react-router-dom';
import PostHeader from '../UI/PostHeader';
import PlaceLogo from '../../assets/logo/place_logo.svg';

function PlaceHeader({ amenityName }) {
  const location = useLocation();
  const isAmenityPage = location.pathname.includes('/amenity');

  const description = isAmenityPage
    ? `${amenityName}에 방문한 멍친구들의 게시글이에요!`
    : '친구들이 많이 방문한 장소예요!';
  return <PostHeader title="home" img={PlaceLogo} description={description} />;
}

export default PlaceHeader;
