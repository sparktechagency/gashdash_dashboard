import { baseApi } from './baseApi';

const dashBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardUserData: builder.query({
      query: (query) => ({
        url: `/payments/dashboard-data`,
        method: 'GET',
        params: query,
      }),
    }),
    getDashboardDriverData: builder.query({
      query: (query) => ({
        url: `/payments/dashboard-data`,
        method: 'GET',
        params: query,
      }),
    }),
  }),
});

export const { useGetDashboardUserDataQuery, useGetDashboardDriverDataQuery } = dashBoardApi;
