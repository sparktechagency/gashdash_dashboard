import { baseApi } from './baseApi';

const uploadImageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query({
      query: () => ({ url: `/settings`, method: 'GET' }),
      providesTags: ['image'],
    }),
    updateImage: builder.mutation({
      query: (data) => ({ url: `/settings`, method: 'PATCH', body: data }),
      invalidatesTags: ['image'],
    }),
  }),
});

export const { useGetImagesQuery, useUpdateImageMutation } = uploadImageApi;
