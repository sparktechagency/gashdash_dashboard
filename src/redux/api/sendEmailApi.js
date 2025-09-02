import { baseApi } from './baseApi';

const EmailsendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (message) => ({
        url: `/pushNotifications/create`,
        method: 'POST',
        body: message,
      }),
    }),
  }),
});
export const { useSendEmailMutation } = EmailsendApi;
