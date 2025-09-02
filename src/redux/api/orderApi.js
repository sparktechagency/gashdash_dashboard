import { baseApi } from './baseApi';

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: ({ limit, page, searchText, orderType }) => ({
        url: `/orders?limit=${limit}&page=${page}&searchTerm=${searchText}&orderType=${orderType}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    getAllEmargencyOrders: builder.query({
      query: ({ limit, page, searchText, orderType }) => ({
        url: `/orders?limit=${limit}&page=${page}&searchTerm=${searchText}&orderType=${orderType}&emergency=true`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    // get single order

    getSingleOrders: builder.query({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, driverid, status }) => ({
        url: `/orders/update/${orderId}`,
        method: 'PATCH',
        body: {
          orderStatus: status,
          driverId: driverid,
        },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetAllEmargencyOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetSingleOrdersQuery,
} = OrderApi;
