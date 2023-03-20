import React from 'react';
import PostHeader from '../UI/PostHeader';
import PlaceLogo from '../../assets/logo/place_logo.svg';

function PlaceHeader() {
  return (
    <PostHeader
      title="home"
      img={PlaceLogo}
      description="친구들이 많이 방문한 장소예요!"
    />
  );
}

export default PlaceHeader;
