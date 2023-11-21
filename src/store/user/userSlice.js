import {createSlice} from '@reduxjs/toolkit';
import {serviceApi} from '../services';

const initialState = {
  user: undefined,
  userToken: undefined,
  paymentMethod: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    userLogin: (state, {payload}) => {
      state.user = payload.user;
      state.userToken = payload.token;
    },
    updateUser: (state, {payload}) => {
      state.user = payload;
    },
    userDefaultPaymentMethod: (state, {payload}) => {
      state.paymentMethod = payload;
    },
    updateUserToken: (state, {payload}) => {
      state.userToken = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      serviceApi.endpoints.loginUser.matchFulfilled,
      (state, {payload}) => {
        state.user = payload?.data?.user;
        state.userToken = payload?.data?.credentials?.token;
      },
    );
    builder.addMatcher(
      serviceApi.endpoints.logout.matchFulfilled,
      (state, {payload}) => {
        state.user = undefined;
        state.userToken = undefined;
      },
    );
  },
});

export const {
  userLogin,
  updateUser,
  updateUserToken,
  userDefaultPaymentMethod,
} = userSlice.actions;

export default userSlice.reducer;
