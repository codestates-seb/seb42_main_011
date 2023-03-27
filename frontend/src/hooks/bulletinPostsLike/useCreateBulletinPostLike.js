import { useMutation } from 'react-query';
import { createBulletinPostLike } from '../../api/bulletinPostsApi';

const queryKey = 'createBulletinPostLike';

const useCreateBulletinPostLike = ({
  onSuccess = () => {},
  onError = () => {},
}) => {
  const { mutateAsync } = useMutation(queryKey, createBulletinPostLike, {
    onSuccess,
    onError,
  });

  return { mutateAsync, queryKey };
};

export default useCreateBulletinPostLike;
