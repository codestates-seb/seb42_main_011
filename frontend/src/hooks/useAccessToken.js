import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../redux/actions/auth';

function useAccessToken() {
  const { accessToken } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorage = () => {
      const accessTokenValue = localStorage.getItem('accessToken') || null;
      dispatch(setAccessToken(accessTokenValue));
    };
    // 컴포넌트가 마운트될 때 이벤트 리스너 등록
    window.addEventListener('storage', handleStorage);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener('storage', handleStorage);
    };
  }, [dispatch]);

  return accessToken;
}

export default useAccessToken;
