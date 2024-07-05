import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementTimer,
  stopTimer,
  startTimer,
  resetTimer,
  setTimerRef,
  clearTimerRef,
} from './src/store/timer/timerSlice';

const useTimer = (initialSeconds = 60) => {
  const dispatch = useDispatch();
  const {seconds, isRunning, timerRef} = useSelector(state => state.timer);
  const localTimerRef = useRef(null); // Local ref to store the timer interval

  console.log('IS', isRunning);

  useEffect(() => {
    const currentTimerRef = timerRef || localTimerRef.current;

    if (isRunning && seconds > 0) {
      if (!currentTimerRef) {
        localTimerRef.current = setInterval(() => {
          dispatch(decrementTimer());
        }, 1000);
        dispatch(setTimerRef(localTimerRef.current)); // Store localTimerRef in Redux
      }
    } else if (seconds === 0 || !isRunning) {
      clearInterval(currentTimerRef);
      dispatch(clearTimerRef()); // Clear timerRef from Redux
      localTimerRef.current = null;
      if (seconds === 0) {
        dispatch(stopTimer());
      }
    }

    // Cleanup function to clear the interval
    return () => {
      clearInterval(currentTimerRef);
      dispatch(clearTimerRef()); // Clear timerRef from Redux on cleanup
      localTimerRef.current = null;
    };
  }, [dispatch, isRunning, seconds, timerRef]);

  const start = () => {
    console.log('Start pressed');
    dispatch(startTimer());
  };

  const stop = () => {
    console.log('stop pressed');
    dispatch(stopTimer());
    clearInterval(localTimerRef.current); // Clear interval on stop
  };

  const reset = (newInitialSeconds = initialSeconds) => {
    dispatch(resetTimer(newInitialSeconds));
    clearInterval(localTimerRef.current); // Clear interval on reset
    dispatch(stopTimer());
    dispatch(clearTimerRef()); // Clear timerRef from Redux on cleanup
  };

  return {seconds, isRunning, start, stop, reset};
};

export default useTimer;
