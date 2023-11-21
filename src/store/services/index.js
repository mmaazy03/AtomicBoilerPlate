import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURL = 'https://jsonplaceholder.typicode.com/';

const maxContentLength = 10;

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, {getState}) => {
      const state = getState();
      if (state?.user?.userToken) {
        headers.set('token', `${state?.user?.userToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'MCoach', 'MCoaches', 'Chats', 'Notifications', 'Posts'],

  endpoints: builder => ({
    //----------------------------------------------A U T H-------------------------------------//
    loginUser: builder.mutation({
      query: data => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),
    signupUser: builder.mutation({
      query: data => ({
        url: 'signup',
        method: 'POST',
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: data => ({
        url: 'auth/forgotPassword',
        method: 'POST',
        body: data,
      }),
    }),
    matchOtp: builder.mutation({
      query: data => ({
        url: 'auth/match-otp',
        method: 'PATCH',
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: data => ({
        url: 'auth/resend-otp',
        method: 'PATCH',
        body: data,
      }),
    }),
    resetNewPassword: builder.mutation({
      query: data => ({
        url: 'auth/confirm-password',
        method: 'PATCH',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),

    //-------------USER END POINTS-----------------//

    updateUser: builder.mutation({
      query: data => ({
        url: 'users/updateMe',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getUpdatedUser: builder.query({
      query: () => 'users/me',
      invalidatesTags: ['User'],
    }),

    updateUserPassword: builder.mutation({
      query: ({url, data}) => ({
        url: url,
        method: 'PATCH',
        body: data,
      }),
    }),

    refreshUserToken: builder.mutation({
      query: () => ({}),
      invalidatesTags: ['User', 'Employees'],
    }),

    //---------------------- CHAT END POINTS ------------------------//
    getChatsList: builder.query({
      query: ({status, page, search}) =>
        `chats/?status=${status}&page=${page}&limit=8&search=${search}`,
      providesTags: ['Chats'],
    }),

    getChatsOfRoom: builder.query({
      query: ({room, page, search}) =>
        `chats/?room=${room}&page=${page}&limit=8&search=${search}`,
      providesTags: ['Chats'],
    }),

    chatSeen: builder.mutation({
      query: data => ({
        url: `chat/seen/${data}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Chats'],
    }),

    createSingleChat: builder.mutation({
      query: data => ({
        url: 'createGroupChat',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chats'],
    }),

    createGroupChat: builder.mutation({
      query: data => ({
        url: 'createGroupChat',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chats'],
    }),
  }),
});

export const {
  //AUTH ENDPOINTS
  useLoginUserMutation,
  useSignupUserMutation,
  useForgetPasswordMutation,
  useMatchOtpMutation,
  useResendOtpMutation,
  useResetNewPasswordMutation,
  useLogoutMutation,

  // ! CHATS
  useGetChatsListQuery,
  useChatSeenMutation,

  useAddCheckInMutation,
} = serviceApi;
