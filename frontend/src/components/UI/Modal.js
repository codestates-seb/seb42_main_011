/* eslint-disable no-unused-vars */
import React from 'react'
import styled, { css } from 'styled-components';
import './modal.css'

function Modal({ children, title }) {
  const Title = styled.div`
  `;
  const CloseButton = styled.button`
  `;
  return (
    <div className='modal'>
      <div className='modal__container--outer'>
        <div className='modal__container--inner'>
          <div className='modal__title'>
            {title}
          </div>
          <div className='modal__title2'>
            {title}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal