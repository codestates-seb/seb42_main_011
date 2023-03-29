import { useMutation } from 'react-query';
import { createComments } from '../../api/commentsApi';

const queryKey = 'createComments';

const useCreateComments = ({ onSuccess, onError }) => {
  const { mutateAsync } = useMutation(queryKey, createComments, {
    onSuccess,
    onError,
  });

  return { mutateAsync, queryKey };
};

export default useCreateComments;
