import { useCallback, useState } from 'react';
// import { isFunction } from './utils';

const useSetState = (initialState, prevState) => {

  const [state, setState] = useState(initialState);

  const setMergeState = useCallback((patch) => {
    setState((prevState) => ({
      ...prevState,
      // ...(isFunction(patch) ? patch(prevState) : patch),
    }));
  }, []);

  return [state, setMergeState]; 
};

export default useSetState;
