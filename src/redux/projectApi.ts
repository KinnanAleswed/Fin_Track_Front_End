// src/redux/api/projectApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  //LookupOption,
  GetLookupsResponse,
  NewProjectRequest,
  NewProjectResponse,
  ProjectListItem, // ← import the new list‐item type
} from "./types/projecttypes";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    // 1) LOOKUPS
    getDetailedLookups: builder.query<GetLookupsResponse, void>({
      query: () => "/DetailedLookups",
    }),

    // 2) FETCH PROJECTS
    getProjects: builder.query<ProjectListItem[], void>({
      
      query: () => "/projects",
      providesTags: ["Project"],
    }),

    // 3) ADD PROJECT
    addProject: builder.mutation<NewProjectResponse, NewProjectRequest>({
      query: (projectData) => ({
        url: "/projects",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetDetailedLookupsQuery,
  useGetProjectsQuery,
  useAddProjectMutation,
} = projectApi;
