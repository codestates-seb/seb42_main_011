import { useQuery } from 'react-query';
import getAmenity from '../../api/amenityApi';

const queryKey = 'getAmenity';

const useGetAmenity = ({ amenityId, enabled = true }) => {
  const { data, refetch } = useQuery(
    [queryKey],
    () => getAmenity({ amenityId }),
    {
      enabled,
      suspense: true,
    },
  );

  return { data, refetch, queryKey };
};

export default useGetAmenity;
