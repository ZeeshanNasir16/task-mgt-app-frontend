import { useState } from 'react';

const useTextInput = (initialState = '') => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: any) => {
    setState(e.target.value);
  };

  const resetState = () => {
    setState(initialState);
  };

  return [state, handleChange, resetState, setState];
};

export default useTextInput;
