import { baseApi } from './baseApi';

const ServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateNewService: builder.mutation({
      query: (data) => ({
        url: '/services/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    getAllservice: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/services?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
    updateserviceStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const {
  useCreateNewServiceMutation,
  useGetAllserviceQuery,
  useUpdateserviceStatusMutation,
  useDeleteServiceMutation,
} = ServiceApi;
