import { baseApi } from './baseApi';

const SubCriptionAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCription: builder.query({
      query: () => ({ url: `/packages`, method: 'GET' }),
      providesTags: ['pakage'],
    }),

    CreateSubCription: builder.mutation({
      query: (data) => ({ url: '/packages', method: 'POST', body: data }),
      invalidatesTags: ['pakage'],
    }),

    deleteSubCription: builder.mutation({
      query: (id) => ({ url: `/packages/${id}`, method: 'DELETE' }),
      invalidatesTags: ['pakage'],
    }),

    updateSubCription: builder.mutation({
      query: ({ id, value }) => ({ url: `/packages/${id}`, method: 'PUT', body: value }),
      invalidatesTags: ['pakage'],
    }),
  }),
});

export const {
  useGetAllSubCriptionQuery,
  useCreateSubCriptionMutation,
  useDeleteSubCriptionMutation,
  useUpdateSubCriptionMutation,
} = SubCriptionAPi;
