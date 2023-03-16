import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  const onChange = useCallback(e => {
    const { name, value } = e.target;

    setForm(preState => ({ ...preState, [name]: value }));
  }, []);

  return [form, onChange, reset];
}

export default useInputs;
