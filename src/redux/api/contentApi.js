import { baseApi } from './baseApi';

const ContentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContents: builder.query({
      query: () => ({ url: `/settings`, method: 'GET' }),
      providesTags: ['content'],
    }),
    updateContent: builder.mutation({
      query: (data) => ({ url: `/settings`, method: 'PATCH', body: data }),
      invalidatesTags: ['content'],
    }),
  }),
});

export const { useGetContentsQuery, useUpdateContentMutation } = ContentApi;
