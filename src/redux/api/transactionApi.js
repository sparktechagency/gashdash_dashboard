import { baseApi } from './baseApi';

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetTransectionData: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/payments?isPaid=true&limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: 'GET',
      }),
      providesTags: ['transection'],
    }),
    // refund transection
    refundTransection: builder.mutation({
      query: (id) => ({
        url: `payments/refund/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['transection'],
    }),
  }),
});

export const { useGetTransectionDataQuery, useRefundTransectionMutation } = transactionApi;
