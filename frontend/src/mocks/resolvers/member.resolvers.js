// src/mocks/handlers.js

import memberDumy from '../data/member';

export const postLogin = async (req, res, ctx) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return res(ctx.status(401));
  }

  return res(
    // Respond with a 200 status code
    ctx.set('Authorization', 'Bearer aiwu4e8237918279awoieZKLwje129039182'),
    ctx.status(200),
    ctx.json({
      message: '정상적으로 로그인 되었습니다.',
    }),
  );
};

export const postLogout = (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const isAuthenticated = req.headers.getItem('Authorization');

  if (!isAuthenticated) {
    // If not authenticated, respond with a 403 error
    return res(
      ctx.status(403),
      ctx.json({
        message: 'Not authorized',
      }),
    );
  }

  // If authenticated, return a mocked user details
  return res(
    ctx.status(200),
    ctx.json({
      message: '정상적으로 로그아웃 되었습니다.',
    }),
  );
};

const validateUser = ({ email, password, nickname, dogName, dogGender }) => {
  const messages = [];

  if (email.length < 0) {
    messages.push('이메일 유효성 실패');
  }

  const regex = /^.*(?=^.{8,20}$)(?=.*d)(?=.*[a-z])(?=.*[!@#$%^&+=]).*$/gi;

  if (password.length < 8 || regex.test(password)) {
    messages.push('패스워드 유효성 실패');
  }

  if (nickname.length < 10) {
    messages.push('닉네임 유효성 실패');
  }

  if (dogName.length < 10) {
    messages.push('강아지 이름 유효성 실패');
  }

  if (dogGender.length < 0) {
    messages.push('강아지 성별 유효성 실패');
  }

  return messages;
};

export const postSignup = async (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const { email, password, nickname, dogName, dogGender } = await req.json();

  if (email === 'wjdwjdtn92@naver.com') {
    return res(
      ctx.status(409),
      ctx.json({
        message: '이미 존재하는 회원 입니다.',
      }),
    );
  }

  const messages = validateUser({
    email,
    password,
    nickname,
    dogName,
    dogGender,
  });
  if (messages.length > 0) {
    // If not authenticated, respond with a 403 error

    return res(
      ctx.status(400),
      ctx.json({
        message: messages.join(', '),
      }),
    );
  }

  return res(
    ctx.status(201),
    ctx.json({
      message: '정상적으로 회원가입 되었습니다.',
    }),
  );
};

export const getMember = (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const { memberId } = req.params;

  if (memberId === 404) {
    // If not authenticated, respond with a 403 error
    return res(
      ctx.status(404),
      ctx.json({
        message: 'memberId 없음',
      }),
    );
  }

  // If authenticated, return a mocked user details
  return res(ctx.status(200), ctx.json(memberDumy));
};

export const pathchMember = (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const isAuthenticated = req.headers.getItem('Authorization');

  if (!isAuthenticated) {
    // If not authenticated, respond with a 403 error
    return res(
      ctx.status(403),
      ctx.json({
        message: 'Not authorized',
      }),
    );
  }

  // If authenticated, return a mocked user details
  return res(
    ctx.status(200),
    ctx.json({
      message: '정상적으로 수정되었습니다.',
    }),
  );
};

export const deleteMember = (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const isAuthenticated = req.headers.getItem('Authorization');

  if (!isAuthenticated) {
    // If not authenticated, respond with a 403 error
    return res(
      ctx.status(403),
      ctx.json({
        message: 'Not authorized',
      }),
    );
  }

  // If authenticated, return a mocked user details
  return res(ctx.status(204));
};
