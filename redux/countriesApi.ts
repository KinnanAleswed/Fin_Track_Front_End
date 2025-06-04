import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countryApi = createApi({
    reducerPath: "countryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
    tagTypes: ["Country"],
    endpoints: (builder) => ({
        // Get all countries
        getCountries: builder.query<any[],void>({
            query: () => "/countries",
            providesTags: ["Country"],
        }),
        // Create country
        createCountry: builder.mutation({
            query: (data) => ({
                url: "/countries",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Country"],
        }),
        // Update country
        updateCountry: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/countries/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Country"],
        }),
    }),
});
export const {
    useGetCountriesQuery,
    useCreateCountryMutation,
    useUpdateCountryMutation,
} = countryApi;