import { baseApi } from './baseApi';

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotification: builder.query({
      query: (query) => ({
        url: `/notifications`,
        method: 'GET',
        params: query,
      }),
      providesTags: ['notification'],
      transformResponse: (response) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    markAsRead: builder.mutation({
      query: () => ({
        url: `/notifications`,
        method: 'PATCH',
      }),
      invalidatesTags: ['notification'],
    }),
    deleteNotification: builder.mutation({
      query: () => ({
        url: `/notification`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notification'],
    }),
    deleteSingleNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const {
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteSingleNotificationMutation,
} = notificationApi;
