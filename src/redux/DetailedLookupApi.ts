
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const detailedLookupApi = createApi({
  reducerPath: 'detailedLookupApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['DetailedLookup'],
  endpoints: (builder) => ({
    //get Detailed Lookups
    getDetailedLookups: builder.query({
      query: (masterId?: number) => ({
        url: `/detailed-lookups`,
        params: {
          ...(masterId && { masterId }),
        },
      }),
      providesTags: ['DetailedLookup'],
    }),
    // Create Detailed Lookup
    createDetailedLookup: builder.mutation({
      query: (data) => ({
        url: '/detailed-lookups',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['DetailedLookup'],
    }),
  }),
});

export const {
  useGetDetailedLookupsQuery,
  useCreateDetailedLookupMutation,
} = detailedLookupApi;
