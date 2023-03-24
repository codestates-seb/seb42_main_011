import { useState, useEffect } from 'react';

function useDebounce(initValue, delay) {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(initValue);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [initValue, delay]);

  return value;
}

export default useDebounce;
