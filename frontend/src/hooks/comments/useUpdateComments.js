import { useMutation } from 'react-query';
import { updateComments } from '../../api/commentsApi';

const queryKey = 'updateComments';

const useUpdateComments = ({ onSuccess, onError }) => {
  const { mutateAsync } = useMutation(queryKey, updateComments, {
    onSuccess,
    onError,
  });

  return { mutateAsync, queryKey };
};

export default useUpdateComments;
