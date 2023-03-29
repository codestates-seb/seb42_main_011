import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from './useModal';

import Button from '../components/UI/Button';
import ModalBase from '../components/UI/Modal/ModalBase';

function useAxiosErrorModal(isAllErrorShow = false, errorCallback = () => {}) {
  const { openModal, closeAllModal } = useModal();
  const navigate = useNavigate();

  const handleLoginClick = useCallback(() => {
    navigate('/login');
    closeAllModal();
  }, [navigate]);

  const handleError = error => {
    if (error.response?.data?.status === 401) {
      openModal(
        <ModalBase
          title="로그인 필요"
          content="로그인이 필요합니다. 로그인 화면으로 이동하시겠습니까?"
          buttons={
            <Fragment>
              <Button onClick={handleLoginClick}>예</Button>
              <Button>아니요</Button>
            </Fragment>
          }
        />,
      );

      return;
    }

    if (error.response?.data?.status === 403) {
      openModal(
        <ModalBase
          title="로그인 필요"
          content="로그인이 필요합니다. 로그인 화면으로 이동하시겠습니까?"
          buttons={
            <Fragment>
              <Button onClick={handleLoginClick}>예</Button>
              <Button>아니요</Button>
            </Fragment>
          }
        />,
      );

      return;
    }

    if (error.response?.data?.status === 500 || isAllErrorShow) {
      openModal(
        <ModalBase
          title="서버 오류"
          content="잠시 후 다시 시도해주세요"
          buttons={<Button onClick={errorCallback}>예</Button>}
        />,
      );
    }
  };

  return handleError;
}

export default useAxiosErrorModal;
