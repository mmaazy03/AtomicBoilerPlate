import {useEffect, useState} from 'react';

const debounce = props => {
  const {value, delay = 1000} = props;
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeOutId);
  }, [value, delay]);

  return debouncedValue;
};

export default debounce;
