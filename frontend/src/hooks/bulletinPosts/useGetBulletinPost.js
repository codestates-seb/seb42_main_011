import { useQuery } from 'react-query';
import { getBulletinPost } from '../../api/bulletinPostsApi';

const queryKey = 'postDetail';

const useGetBulletinPost = ({ bulletinId, enabled = true }) => {
  const { data, refetch } = useQuery(
    [queryKey],
    () => getBulletinPost({ bulletinId }),
    {
      enabled,
      suspense: true,
    },
  );

  return { data, refetch, queryKey };
};

export default useGetBulletinPost;
