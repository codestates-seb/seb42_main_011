/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  width: 226px;
  height: 310px;
  border: var(--border);
  border-radius: 110px 110px 5px 5px;

  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &:hover {
    transform: translate(-0.25rem, -0.25rem);
    box-shadow: 3px 3px 0 0 var(--color-dark-0);
  };
`;

const ProfileName = styled.div`
  height: 37px;
  background-color: var(--color-light-0);
  border-top: 0.094rem solid var(--color-dark-0);
  font-size: 20px;
  text-align: center;
  line-height: 34px;
  font-weight: 500;
  position: relative;
  .svg-button {
    height: 37px;
    position: absolute;
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
        <div className='svg-button'>
          <svg width="19" height="6" viewBox="0 0 19 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.87207 5.27786H18.129L13.561 0.709839" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>  
        </div>
      </ProfileName>
    </ProfileBox>
  )
}

export default Profile