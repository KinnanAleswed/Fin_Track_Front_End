import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["City"],
  endpoints: (builder) => ({
    //get all cties
    getCities: builder.query<string,void>({
      query: () => "/cities",
      providesTags: ["City"],
    }),
    //create city
    createCity: builder.mutation({
      query: (data) => ({
        url: "/cities",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["City"],
    }),

    //get city by country id
    getCitiesByCountryId: builder.query({
        query: (countryId) => ({
            url: `/cities/country/${countryId}`,
        }),
        providesTags: ["City"],
        }),

        //update city
    updateCity: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/cities/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["City"],
    }),

    //get city by id
    getCityById: builder.query({
      query: (id) => ({
        url: `/cities/${id}`,
      }),
      providesTags: ["City"],
    })
  }),
});
export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useGetCitiesByCountryIdQuery,
  useUpdateCityMutation,
  useGetCityByIdQuery,
} = cityApi;