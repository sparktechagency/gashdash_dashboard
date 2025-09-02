import { baseApi } from './baseApi';

const CuponCodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateNewCupon: builder.mutation({
      query: (data) => ({
        url: '/cupons/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cuponCode'],
    }),
    getAllCupone: builder.query({
      query: () => ({
        url: `/cupons`,
        method: 'GET',
      }),
      providesTags: ['cuponCode'],
    }),
    updateCuponCode: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteCupone: builder.mutation({
      query: (id) => ({
        url: `/cupons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cuponCode'],
    }),
  }),
});

export const { useGetAllCuponeQuery, useCreateNewCuponMutation, useDeleteCuponeMutation } =
  CuponCodeApi;
