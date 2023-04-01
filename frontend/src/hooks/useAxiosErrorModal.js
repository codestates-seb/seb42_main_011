import React from 'react';
import useModal from './useModal';

import Button from '../components/UI/Button';
import ModalBase from '../components/UI/Modal/ModalBase';
import LoginRequestModal from '../components/UI/LoginRequestModal';

function useAxiosErrorModal(isAllErrorShow = false, errorCallback = () => {}) {
  const { openModal } = useModal();

  const handleError = error => {
    console.log(error.response);
    if (error.response?.data?.status === 401) {
      openModal(<LoginRequestModal />);

      return;
    }

    if (error.response?.status === 403) {
      openModal(<LoginRequestModal />);

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
