import { useMutation } from 'react-query';
import { deleteBulletinPostLike } from '../../api/bulletinPostsApi';

const queryKey = 'deleteBulletinPostLike';

const useDeleteBulletinPostLike = ({ onSuccess, onError }) => {
  const { mutateAsync } = useMutation(queryKey, deleteBulletinPostLike, {
    onSuccess,
    onError,
  });

  return { mutateAsync, queryKey };
};

export default useDeleteBulletinPostLike;
