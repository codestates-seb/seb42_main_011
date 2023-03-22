/* eslint-disable import/no-extraneous-dependencies */
// src/mocks/handlers.js
import { rest } from 'msw';
import {
  postLogin,
  postLogout,
  postSignup,
  getMember,
  pathchMember,
  deleteMember,
  getPosts,
  getSearchs,
} from './resolvers/member.resolvers';

export default [
  rest.post('/api/v1/auth/login', postLogin),
  rest.post('/api/v1/auth/logout', postLogout),
  rest.post('/api/v1/members', postSignup),
  rest.get('/api/v1/members/:memberId', getMember),
  rest.get('/api/v1/bulletin-posts', getPosts),
  rest.get('/api/v1/search', getSearchs),
  rest.patch('/api/v1/members/:memberId', pathchMember),
  rest.delete('/api/v1/members', deleteMember),
];
