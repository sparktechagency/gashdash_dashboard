import { baseApi } from './baseApi';

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllusers: builder.query({
      query: ({ limit, page, searchText, role }) => ({
        url: `/users?limit=${limit}&page=${page}&searchTerm=${searchText}&role=${role}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    blockUnblockUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/update/${id}`,
        method: 'PATCH',
        body: { status: data },
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useGetAllusersQuery, useBlockUnblockUserMutation } = UserApi;
