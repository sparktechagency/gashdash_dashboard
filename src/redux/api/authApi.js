import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: '/otp/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/otp/resend-otp',
        method: 'POST',
        body: { email: data },
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'PATCH',
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'PATCH',
        body: data,
      }),
    }),

    changepassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: data,
      }),
    }),

    // get my profile ---------------

    getMyProfile: builder.query({
      query: (data) => ({
        url: '/users/my-profile',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),

    // update profile api endpoint
    updateProfileinfo: builder.mutation({
      query: (data) => ({
        url: '/users/update-my-profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});

export const {
  useSignInMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangepasswordMutation,
  useGetMyProfileQuery,
  useUpdateProfileinfoMutation,
} = authApi;
