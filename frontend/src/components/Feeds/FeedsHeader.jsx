import React from 'react';
import PostHeader from '../UI/PostHeader';
import HomeLogo from '../../assets/logo/home_logo.svg';

function FeedsHeader() {
  return (
    <PostHeader
      title="home"
      img={HomeLogo}
      description="친구들의 피드를 확인해보세요!"
    />
  );
}

export default FeedsHeader;
