import { useCallback, useState } from 'react';

function useImageError(src) {
  const defaultProfileUrl =
    'https://cdn-icons-png.flaticon.com/512/1130/1130933.png?w=2000&t=st=1680005925~exp=1680006525~hmac=8e8077d62e937c5ca56e24827f856a436440d7fb244eff53af34fffddc88d213';
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleErrorImage = useCallback(() => {
    if (!error) {
      setImgSrc(defaultProfileUrl);
      setError(true);
    }
  }, [defaultProfileUrl]);

  return [imgSrc, handleErrorImage];
}

export default useImageError;
