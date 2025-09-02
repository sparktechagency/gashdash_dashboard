import { baseApi } from './baseApi';

const CityExpensionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCityExpension: builder.mutation({
      query: (data) => ({
        url: '/cityExpansion/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cityExpansion'],
    }),

    getCityExpension: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/cityExpansion?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: 'GET',
      }),
      providesTags: ['cityExpansion'],
    }),
    updateCityExpension: builder.mutation({
      query: ({ data, id }) => ({
        url: `/cityExpansion/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['cityExpansion'],
    }),
    deleteCityExpension: builder.mutation({
      query: (id) => ({
        url: `/cityExpansion/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cityExpansion'],
    }),
  }),
});

export const {
  useGetCityExpensionQuery,
  useCreateCityExpensionMutation,
  useUpdateCityExpensionMutation,
  useDeleteCityExpensionMutation,
} = CityExpensionApi;
