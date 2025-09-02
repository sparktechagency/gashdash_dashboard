import { baseApi } from './baseApi';

const withdrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWithdrawRequest: builder.query({
      query: ({ search, page, limit }) => ({
        url: `/withdrawal?searchTerm=${search}&page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['withdraw'],
    }),
    updateWithdrawRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/withdrawal/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['withdraw'],
    }),
  }),
});
export const { useGetWithdrawRequestQuery, useUpdateWithdrawRequestMutation } = withdrawApi;
