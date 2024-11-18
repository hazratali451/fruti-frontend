import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PaymentApi = createApi({
  reducerPath: "PaymentApis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments`,
  }),
  endpoints: (builder) => ({
    bkashPayment: builder.mutation({
      query: (order_number) => ({
        url: `/bkash?order_number=${order_number}`,
        method: "POST",
      }),
    }),
    otherPayment: builder.mutation({
      query: ({ order_number, body }) => ({
        url: `/others?order_number=${order_number}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export the auto-generated hooks for the API endpoints
export const { useBkashPaymentMutation, useOtherPaymentMutation } = PaymentApi;
