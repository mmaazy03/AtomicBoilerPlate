import {createSlice} from '@reduxjs/toolkit';
import {serviceApi} from '../services';

const initialState = {
  isOnBoard: false,
  inOnCoachSelected: false,
  selectedLanguage: 'en',
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    onBoardCompleted: (state, {payload}) => {
      state.isOnBoard = true;
    },
    clearCommon: (state, {payload}) => {
      state.inOnCoachSelected = false;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      serviceApi.endpoints.logout.matchFulfilled,
      (state, {payload}) => {
        state.inOnCoachSelected = false;
      },
    );
  },
});

export const {onBoardCompleted, clearCommon} = commonSlice.actions;

export default commonSlice.reducer;
