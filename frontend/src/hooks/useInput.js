import { useState, useCallback } from 'react';
import useDebounce from './useDebounce';

function useInput(initialValue, delay = 100) {
  const [input, setInput] = useState(initialValue);
  const debouncedValue = useDebounce(input, delay);

  // change
  const onChange = useCallback(event => {
    const { value } = event.target;

    setInput(value);
  }, []);

  const reset = useCallback(() => setInput(''));
  return [input, debouncedValue, onChange, reset];
}

export default useInput;
