import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderApi = createApi({
  reducerPath: "OrderAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders`,
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/create-order",
        method: "POST",
        body,
      }),
    }),
    executeBkashPayment: builder.mutation({
      query: (paymentID) => ({
        url: "/execute-bkash-payment",
        method: "POST",
        body: { paymentID },
      }),
    }),
    getOrders: builder.query({
      query: (token) => ({
        url: "/get-orders",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrder: builder.query({
      query: (order_number) => ({
        url: `/get-order?order_number=${order_number}`,
      }),
    }),
  }),
});

// Export the auto-generated hooks for the API endpoints
export const {
  useCreateOrderMutation,
  useExecuteBkashPaymentMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
} = OrderApi;
