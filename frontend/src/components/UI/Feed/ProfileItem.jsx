import React from 'react'
import styled from 'styled-components'

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  width: 226px;
  height: 310px;
  
  /* border */
  border: var(--border);
  border-radius: 110px 110px 5px 5px;
  
  /* 프로필 사진 */
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  /* 호버 */
  &:hover {
    transform: translate(-0.25rem, -0.25rem);
    box-shadow: 3px 3px 0 0 var(--color-dark-0);
  };
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
  };
`;

function Profile({photoUrl, dogName}) {
  return (
    <ProfileBox url={photoUrl}>
      <ProfileName>
        {dogName}
        <div className='profileitem__svg--button'>
          <img src="icon/arrow-right.svg" alt="" /> 
        </div>
      </ProfileName>
    </ProfileBox>
  )
}

export default Profile