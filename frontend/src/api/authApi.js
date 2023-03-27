/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

// 이메일, 닉네임 중복확인
async function emailVerify(input) {
  const params = { email: input };
  await axios.get(
    '/api/v1/members/check',
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
  await axios.get(
    '/api/v1/members/check',
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
  await axios.post(
    '/api/v1/password',
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
  await axios
    .post(
      '/api/v1/new-password',
      { email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': '12',
          withCredentials: true,
        },
      },
    )
    .then(response => {
      alert(response.data.message);
    })
    .catch(error => {
      console.log(error);
      if (error.response.status === 400) {
        alert('입력하신 비밀번호를 다시 확인해주세요.');
      } else {
        alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    });
}

export { emailVerify, nicknameVerify, sendEmail, resetPassword };
