import { baseApi } from './baseApi';

const CheckListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateNewQuestion: builder.mutation({
      query: (data) => ({
        url: '/questions/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['checkListQuestion'],
    }),
    getAllCheckListdata: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/questions?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: 'GET',
      }),
      providesTags: ['checkListQuestion'],
    }),
    deleteCheckListQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['checkListQuestion'],
    }),

    // get checklist history
    getCheckListHistory: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/checklist/?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateNewQuestionMutation,
  useGetAllCheckListdataQuery,
  useDeleteCheckListQuestionMutation,
  useGetCheckListHistoryQuery,
} = CheckListApi;
