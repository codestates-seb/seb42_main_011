import React from 'react';
import styled from 'styled-components';

import IconArrow from '../../../assets/icons/icon-arrow-right.svg';
import useImageError from '../../../hooks/useImageError';
import useObserverFetch from '../../../hooks/useObserverFetch';

const ProfileBox = styled.li`
  width: 226px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  height: 310px;

  /* border */
  border: var(--border);
  border-radius: 110px 110px 5px 5px;

  /* 호버 */
  &:hover {
    transform: translate(-0.3rem, -0.3rem);
    box-shadow: 3px 3px 0 0 var(--color-dark-0);
    cursor: pointer;
  }
`;

const ProifleImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: inherit;
  height: inherit;
`;

const ProfileName = styled.div`
  height: 37px;
  background-color: var(--color-light-0);
  border-top: var(--border);
  position: relative; /* 버튼 위치 때문에 */

  /* 폰트 */
  font-size: 20px;
  text-align: center;
  line-height: 34px;
  font-weight: 500;

  /* 버튼 */
`;

const Button = styled.button`
  position: absolute;
  height: 32px;
  right: 14px;
  bottom: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

function ProfileItem({
  memberId,
  profileUrl,
  name,
  onClick,
  isLastItem,
  onFetch,
}) {
  const { ref } = useObserverFetch({ isLastItem, onFetch });
  const [src, handleErrorImage] = useImageError(profileUrl);

  return (
    <ProfileBox ref={ref} data-member-id={memberId}>
      <ProifleImage
        src={src}
        onError={handleErrorImage}
        alt={`${name} 프로필 사진`}
      />
      <ProfileName>
        {name}
        <Button onClick={onClick}>
          <img src={IconArrow} alt="" />
        </Button>
      </ProfileName>
    </ProfileBox>
  );
}

export default ProfileItem;
