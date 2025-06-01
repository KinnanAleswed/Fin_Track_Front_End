import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const detailedLookupApi = createApi({
  reducerPath: 'detailedLookupApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['DetailedLookup'],
  endpoints: (builder) => ({
    // Get all detailed lookups (optional filter by masterId)
    getDetailedLookups: builder.query({
      query: (masterId?: number) => ({
        url: `/detailed-lookups`,
        params: {
          ...(masterId && { masterId }),
        },
      }),
      providesTags: ['DetailedLookup'],
    }),

    // Get all detailed lookups for a specific master lookup 
    getDetailedLookupsByMasterId: builder.query({
      query: (masterId: number) => `/detailed-lookups/${masterId}`,
      providesTags: ['DetailedLookup'],
    }),

    // Get a single detailed lookup by ID (for edit/view)
    getDetailedLookupById: builder.query({
      query: (id: number) => `/detailed-lookups/item/${id}`,
      providesTags: ['DetailedLookup'],
    }),

    // Create new detailed lookup
    createDetailedLookup: builder.mutation({
      query: (data) => ({
        url: '/detailed-lookups',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['DetailedLookup'],
    }),

    // Update an existing detailed lookup
    updateDetailedLookup: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `detailed-lookups/${id}`,
        method: 'PUT',
        body: {
          ...body,
        },
      }),
      invalidatesTags: ['DetailedLookup'],
    }),
  }),
});

export const {
  useGetDetailedLookupsQuery,
  useGetDetailedLookupsByMasterIdQuery,
  useGetDetailedLookupByIdQuery, // ✅ You can now import this safely
  useCreateDetailedLookupMutation,
  useUpdateDetailedLookupMutation,
} = detailedLookupApi;
