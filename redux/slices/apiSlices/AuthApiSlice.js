import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthApi = createApi({
  reducerPath: "UserAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
  }),
  endpoints: (builder) => ({
    sendOTP: builder.mutation({
      query: (mobileNumber) => ({
        url: "/send-otp",
        method: "POST",
        body: { mobileNumber },
      }),
    }),
    verifyOTP: builder.mutation({
      query: ({ otp, token }) => ({
        url: "/verify-otp",
        method: "POST",
        body: { otp },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    login: builder.query({
      query: (token) => ({
        url: "/login",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// Export the auto-generated hooks for the API endpoints
export const { useSendOTPMutation, useVerifyOTPMutation, useLoginQuery } =
  UserAuthApi;
