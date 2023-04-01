import FEED_DUMY from '../../data/FEED_DUMY';
import FEED_DETAIL_DUMY from '../../data/FEED_DETAIL_DUMY';

export const getPosts = (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const { page } = req.url.searchParams.get('page');
  const { size } = req.url.searchParams.get('size');
  console.log(page, size);
  // If authenticated, return a mocked user details
  return res(
    ctx.status(200),
    ctx.delay(2000),
    ctx.json(FEED_DUMY),
    ctx.set('Content-Type', 'application/json'),
  );
};

export const getPost = (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const { postId } = req.params;
  console.log(postId);

  // If authenticated, return a mocked user details
  return res(
    ctx.status(200),
    ctx.delay(2000),
    ctx.json(FEED_DETAIL_DUMY),
    ctx.set('Content-Type', 'application/json'),
  );
};

export const createPostLike = (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const { postId } = req.params;
  console.log(postId);

  // If authenticated, return a mocked user details
  return res(
    ctx.status(200),
    ctx.json({
      code: '200',
      message: '좋아요가 생성되었습니다.',
      data: {
        likeCount: 1,
      },
    }),
    ctx.set('Content-Type', 'application/json'),
  );
};

export const deletePostLike = (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const { postId } = req.params;
  console.log(postId);

  // If authenticated, return a mocked user details
  return res(
    ctx.status(200),
    ctx.json({
      code: '200',
      message: '좋아요가 취소되었습니다.',
      data: {
        likeCount: 0,
      },
    }),
    ctx.set('Content-Type', 'application/json'),
  );
};
