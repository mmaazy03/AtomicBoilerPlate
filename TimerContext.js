import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

const TimerContext = createContext();

const TimerProvider = ({children, initialSeconds = 60}) => {
  // Add an initialSeconds prop to set the initial time
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      clearInterval(timer);
      setSeconds(60);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const contextValue = useMemo(
    () => ({
      seconds,
      startTimer,
      stopTimer,
      resetTimer,
    }),
    [seconds, startTimer, stopTimer, resetTimer],
  );

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
};

export {TimerContext, TimerProvider};
