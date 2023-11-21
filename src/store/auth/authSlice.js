import {createSlice} from '@reduxjs/toolkit';
import {serviceApi} from '../services';

const initialState = {
  isAuth: false,
  firstTimePop: false,
  userToken: '',
  role: 'Member',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authLogin: (state, {payload}) => {
      state.isAuth = true;
    },
    changeRole: (state, {payload}) => {
      state.role = payload;
    },
    authLogout: (state, {payload}) => {
      state.isAuth = false;
      state.role = 'Member';
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      serviceApi.endpoints.loginUser.matchFulfilled,
      (state, {payload}) => {
        state.isAuth = true;
        state.role = payload?.data?.user?.user_type;
      },
    );
    builder.addMatcher(
      serviceApi.endpoints.logout.matchFulfilled,
      (state, {payload}) => {
        state.isAuth = false;
        state.role = 'Member';
      },
    );
  },
});

export const {authLogin, authLogout, changeRole} = authSlice.actions;

export default authSlice.reducer;
