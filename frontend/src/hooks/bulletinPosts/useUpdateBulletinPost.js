import { useMutation } from 'react-query';
import { updateBulletinPost } from '../../api/bulletinPostsApi';

const queryKey = 'updateBulletinPost';

const useUpdateBulletinPost = ({
  onSuccess = () => {},
  onError = () => {},
}) => {
  const { mutateAsync, mutate } = useMutation(queryKey, updateBulletinPost, {
    onSuccess,
    onError,
  });

  return { mutateAsync, mutate };
};

export default useUpdateBulletinPost;
