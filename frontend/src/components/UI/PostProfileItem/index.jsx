import React from 'react';
import styled from 'styled-components';

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
    transform: translate(-0.25rem, -0.25rem);
    box-shadow: 3px 3px 0 0 var(--color-dark-0);
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
  .profileitem__svg--button {
    position: absolute;
    height: 37px;
    right: 14px;
    bottom: 0;
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }
`;

function ProfileItem({ memberId, photoUrl, name }) {
  return (
    <ProfileBox data-member-id={memberId}>
      <ProifleImage src={photoUrl} alt={`${name} 프로필 사진`} />
      <ProfileName>
        {name}
        <div className="profileitem__svg--button">
          <img src="icon/arrow-right.svg" alt="" />
        </div>
      </ProfileName>
    </ProfileBox>
  );
}

export default ProfileItem;