import authHeader from '../redux/services/auth-header';
import api from './api';

async function createComments({ commentContent, bulletinPostId }) {
  return api
    .post(
      `/comments`,
      { commentContent, bulletinPostId },
      {
        headers: {
          ...authHeader(),
        },
      },
    )
    .then(({ data }) => data);
}

async function updateComments({ commentId, commentContent }) {
  return api
    .patch(
      `/comments/${commentId}`,
      { commentContent },
      {
        headers: {
          ...authHeader(),
        },
      },
    )
    .then(({ data }) => data);
}

async function deleteComments({ commentId }) {
  return api
    .delete(`/comments/${commentId}`, {
      headers: {
        ...authHeader(),
      },
    })
    .then(({ data }) => data);
}

export { createComments, updateComments, deleteComments };
