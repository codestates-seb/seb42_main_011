import { useMutation } from 'react-query';
import { deleteComments } from '../../api/commentsApi';

const queryKey = 'deleteComments';

const useDeleteComments = ({ onSuccess, onError }) => {
  const { mutateAsync } = useMutation(queryKey, deleteComments, {
    onSuccess,
    onError,
  });

  return { mutateAsync, queryKey };
};

export default useDeleteComments;
