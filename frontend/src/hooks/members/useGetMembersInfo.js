import { useQuery } from 'react-query';
import { getUserInfo } from '../../api/userApi';

const queryKey = 'getUserInfo';

const useGetMembersInfo = ({ memberId, enabled = true }) => {
  const { data, refetch, isLoading, isError } = useQuery(
    queryKey,
    () => getUserInfo({ memberId }),
    {
      enabled,
      suspense: true,
    },
  );

  return { data, refetch, queryKey, isLoading, isError };
};

export default useGetMembersInfo;
