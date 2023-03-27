/* eslint-disable import/no-extraneous-dependencies */
import api from './api';
// import Button from '../components/UI/Button';
// import ModalBase from '../components/UI/Modal/ModalBase';
// import useModal from '../hooks/useModal';

// 이메일, 닉네임 중복확인
async function emailVerify(input) {
  const params = { email: input };
  await api.get(
    '/members/check',
    {
      params,
    },
    {
      headers: {
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        withCredentials: true,
      },
    },
  );
}

async function nicknameVerify(input) {
  const params = { nickname: input };
  await api.get(
    '/members/check',
    {
      params,
    },
    {
      headers: {
        'ngrok-skip-browser-warning': 'skip-browser-warning',
        withCredentials: true,
      },
    },
  );
}

async function sendEmail(email) {
  await api.post(
    '/password',
    { email },
    {
      headers: {
        'ngrok-skip-browser-warning': '12',
        withCredentials: true,
      },
    },
  );
}

async function resetPassword(token, email, password) {
  // const { openModal, closeModal } = useModal();
  await api.post(
    '/new-password',
    { email, password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '12',
        withCredentials: true,
      },
    },
  );
}

export { emailVerify, nicknameVerify, sendEmail, resetPassword };
