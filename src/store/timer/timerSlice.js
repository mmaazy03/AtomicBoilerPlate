import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  seconds: 60, // Default initial time
  isRunning: false,
  timerRef: undefined,
};

const timerSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    startTimer: (state, {payload}) => {
      console.log('SGART IMER');
      state.isRunning = true;
    },
    stopTimer: (state, {payload}) => {
      console.log('STOP TIMEr');
      state.isRunning = false;
    },
    resetTimer: state => {
      console.log('RESET TIMER');
      state.seconds = 60;
      // state.isRunning = false;
    },
    setTimerRef: state => {
      state.timerRef = undefined;
    },
    clearTimerRef: state => {
      state.timerRef = null;
      // state.isRunning = false;
    },
    decrementTimer: (state, {payload}) => {
      state.seconds = state.seconds > 0 ? state.seconds - 1 : 0;
    },
  },
});

export const {
  startTimer,
  stopTimer,
  resetTimer,
  decrementTimer,
  setTimerRef,
  clearTimerRef,
} = timerSlice.actions;

export default timerSlice.reducer;
