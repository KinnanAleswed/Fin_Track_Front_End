import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    NewMasterLookup,}from "./types/masterLookupTypes";

export const masterLookupApi = createApi({
    reducerPath: "masterLookupApi",
    baseQuery: fetchBaseQuery({
         baseUrl: "http://localhost:8000/api" }),
         tagTypes: ["MasterLookup"],
    endpoints: (builder) => ({
        // 1) ADD MASTER LOOKUP
        addMasterLookup: builder.mutation({
            query: (masterLookupData) => ({
                url: "/master-lookups",
                method: "POST",
                body: masterLookupData,
            }),
            invalidatesTags: ["MasterLookup"],
        }),
        //Get Master Lookup
        getMasterLookup: builder.query<NewMasterLookup[], void>({
            query: () => "/master-lookups",
            providesTags: ["MasterLookup"],
        }),
        //update Master Lookup
        updateMasterLookup: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `master-lookups/${id}`,
                method: 'PUT',
                body: {
                ...body,
                // modifiedDate: new Date().toISOString()
                }
            }),
             invalidatesTags: ["MasterLookup"],
            }),
    })
})
export const {
  useAddMasterLookupMutation,
  useGetMasterLookupQuery,
  useUpdateMasterLookupMutation,
} = masterLookupApi;
