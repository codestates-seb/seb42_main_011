/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

// 이메일, 닉네임 중복확인
const emailVerify = async input => {
  try {
    const params = { email: input };
    const response = await axios.get(
      '/api/v1/members/check',
      {
        params,
      },
      {
        headers: {
          'ngrok-skip-browser-warning': '12',
          withCredentials: true,
        },
      },
    );
    if (response.status === 200) {
      return '';
    }
    if (response.status === 409) {
      return '이미 사용중인 이메일입니다.';
    }
    return `Unexpected response status: ${response.status}`;
    // return '';
  } catch (error) {
    throw new Error(error);
  }
  // return '';
};

const nicknameVerify = async input => {
  try {
    const params = { nickname: input };
    const response = await axios.get(
      `/api/v1/members/check`,
      {
        params,
      },
      {
        headers: {
          'ngrok-skip-browser-warning': '12',
          withCredentials: true,
        },
      },
    );
    if (response.status === 200) {
      return '';
    }
    if (response.status === 409) {
      return '이미 사용중인 닉네임입니다.';
    }
    // return `Unexpected response status: ${response.status}`;
    return '';
  } catch (error) {
    console.log(error);
  }
  return '';
};

const sendEmail = async email => {
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
};

const resetPassword = async (token, email, password) => {
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
};

export { emailVerify, nicknameVerify, sendEmail, resetPassword };
