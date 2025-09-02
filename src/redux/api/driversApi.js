import { baseApi } from './baseApi';

const driversApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetDriverData: builder.query({
      query: () => ({
        url: `/driverearnings/summary`,
        method: 'GET',
      }),
    }),
    // Get single driver data
    GetSingleDriverData: builder.query({
      query: ({ id }) => ({
        url: `/driverearnings/driver-erning/${id}`,
        method: 'GET',
      }),
    }),
    // Get all valid drivers data
    GetAllValidDrivers: builder.query({
      query: (searchText) => ({
        url: `/users?role=driver&status=active&searchTerm=${searchText}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDriverDataQuery, useGetSingleDriverDataQuery, useGetAllValidDriversQuery } =
  driversApi;
