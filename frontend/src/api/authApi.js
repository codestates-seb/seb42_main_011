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

export { emailVerify, nicknameVerify };
