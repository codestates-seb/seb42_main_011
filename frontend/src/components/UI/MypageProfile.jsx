import React from 'react';
import styled from 'styled-components';

const ProfileImage = styled.img`
  width: 469px;
  height: 666px;
  border-radius: inherit;
  background: var(--color-light-0);
  transform: translate(-0.625rem, -0.625rem);
  border-radius: 300px 300px 10px 10px;
  border: var(--border);
  box-shadow: 0.625rem 0.625rem 0 0 var(--color-dark-0);
`;

function MypageProfile({ image, alt = '', ...props }) {
  return <ProfileImage src={image} alt={alt} {...props} />;
}

export default MypageProfile;
