import { useQuery } from 'react-query';
import { getUserInfo } from '../../api/userApi';

const queryKey = 'getUserInfo';

const useGetMembersInfo = ({ memberId, enabled = true }) => {
  const { data, refetch } = useQuery(
    [queryKey],
    () => getUserInfo({ memberId }),
    {
      enabled,
      suspense: true,
    },
  );

  return { data, refetch, queryKey };
};

export default useGetMembersInfo;
