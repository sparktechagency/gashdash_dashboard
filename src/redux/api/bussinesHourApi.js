import { baseApi } from './baseApi';

const BussinessHourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBussinessHour: builder.query({
      query: () => ({
        url: `/business-ours`,
        method: 'GET',
      }),
      providesTags: ['bussinessHour'],
    }),
    updatebussinessHour: builder.mutation({
      query: ({ data }) => ({
        url: `/business-ours/subscriber`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['bussinessHour'],
    }),
  }),
});

export const { useGetBussinessHourQuery, useUpdatebussinessHourMutation } = BussinessHourApi;
