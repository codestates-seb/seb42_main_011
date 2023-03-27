import { useMutation } from 'react-query';
import { deleteBulletinPost } from '../../api/bulletinPostsApi';

const queryKey = 'deleteBulletinPost';

const useDeleteBulletinPost = ({
  onSuccess = () => {},
  onError = () => {},
}) => {
  const { mutateAsync, mutate } = useMutation(queryKey, deleteBulletinPost, {
    onSuccess,
    onError,
  });

  return { mutateAsync, mutate };
};

export default useDeleteBulletinPost;
