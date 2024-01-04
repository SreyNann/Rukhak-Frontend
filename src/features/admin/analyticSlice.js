import { apiSlice } from "@/utils/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => "/admin/analytics",
      transformResponse: (response, meta, arg) => response.data.slice(0, -1),
    }),
  }),
});

export const { useGetAnalyticsQuery } = extendedApiSlice;
