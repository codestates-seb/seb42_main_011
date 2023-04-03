import React from 'react';
import PostHeader from '../UI/PostHeader';
import HomeLogo from '../../assets/logo/home_logo.svg';

function FeedsHeader() {
  return (
    <PostHeader
      title="home"
      img={HomeLogo}
      description={
        <div style={{ marginLeft: '-10px' }}>친구의 피드를 확인해보세요!</div>
      }
    />
  );
}

export default FeedsHeader;
