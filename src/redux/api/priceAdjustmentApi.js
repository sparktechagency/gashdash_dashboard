import { baseApi } from './baseApi';

const PriceAdjustmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFuelPrice: builder.mutation({
      query: (data) => ({
        url: '/fuelInfo/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['priceAdjustment'],
    }),

    getFuelPriceList: builder.query({
      query: () => ({
        url: `/fuelInfo`,
        method: 'GET',
      }),
      providesTags: ['priceAdjustment'],
    }),

    updateFuelPrice: builder.mutation({
      query: ({ data, id }) => ({
        url: `/fuelInfo/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['priceAdjustment'],
    }),
    deleteFuelPrice: builder.mutation({
      query: (id) => ({
        url: `/fuelInfo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['priceAdjustment'],
    }),

    // ===========================Delivery and Mendatory trip=================

    createDeliveryAndMendetoryTrip: builder.mutation({
      query: (data) => ({
        url: '/deleveryAndtips/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['priceAdjustment'],
    }),

    getDeliveryAndMendetoryTrip: builder.query({
      query: () => ({
        url: `/deleveryAndtips`,
        method: 'GET',
      }),
      providesTags: ['priceAdjustment'],
    }),

    updateDeliveryAndMendetoryTrip: builder.mutation({
      query: ({ data, id }) => ({
        url: `/deleveryAndtips/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['priceAdjustment'],
    }),
    deleteDeliveryAndMendetoryTrip: builder.mutation({
      query: (id) => ({
        url: `/deleveryAndtips/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['priceAdjustment'],
    }),
  }),
});

export const {
  useGetFuelPriceListQuery,
  useGetDeliveryAndMendetoryTripQuery,
  useCreateFuelPriceMutation,
  useUpdateFuelPriceMutation,
  useCreateDeliveryAndMendetoryTripMutation,
  useUpdateDeliveryAndMendetoryTripMutation,
  useDeleteDeliveryAndMendetoryTripMutation,
  useDeleteFuelPriceMutation,
} = PriceAdjustmentApi;
