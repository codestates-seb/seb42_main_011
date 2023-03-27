import { useMutation } from 'react-query';
import { createBulletinPost } from '../../api/bulletinPostsApi';

const queryKey = 'creaetBulletinPosts';

const useCreateBulletinPost = ({
  onSuccess = () => {},
  onError = () => {},
}) => {
  const { mutateAsync, mutate } = useMutation(queryKey, createBulletinPost, {
    onSuccess,
    onError,
  });

  return { mutateAsync, mutate };
};

export default useCreateBulletinPost;
