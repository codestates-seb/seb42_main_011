import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '../../../hooks/useModal';
import Button from '../Button';
import ModalBase from '../Modal/ModalBase';

function LoginRequestModal() {
  const navigate = useNavigate();
  const { closeAllModal } = useModal();

  const handleLoginClick = useCallback(() => {
    navigate('/login');
    closeAllModal();
  }, [navigate]);

  return (
    <ModalBase
      title="로그인 필요"
      content="로그인이 필요합니다. 로그인 화면으로 이동하시겠습니까?"
      buttons={
        <Fragment>
          <Button onClick={handleLoginClick}>예</Button>
          <Button>아니요</Button>
        </Fragment>
      }
    />
  );
}

export default LoginRequestModal;
