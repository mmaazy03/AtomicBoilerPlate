import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  socketRef: null,
};

export const socketSlice = createSlice({
  name: 'socketSlice',
  initialState,
  reducers: {
    setSocketRef: (state, {payload}) => {
      state.socketRef = payload;
    },
  },
});

export const {setSocketRef} = socketSlice.actions;

export default socketSlice.reducer;
