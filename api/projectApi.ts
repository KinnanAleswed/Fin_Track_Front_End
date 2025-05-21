// src/redux/api/projectApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  NewProjectRequest,
  NewProjectResponse,
} from "../../src/redux/types";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    // POST /projects - Create a new project
    addProject: builder.mutation<NewProjectResponse, NewProjectRequest>({
      query: (projectData) => ({
        url: "/projects",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["Project"],
    }),

    // GET /project-managers - Fetch project managers
    getProjectManagers: builder.query<{ id: string; name: string }[], void>({
      query: () => "/project-managers",
    }),

    // GET /projects - Fetch all projects
    getProjects: builder.query<any[], void>({
      query: () => "/projects",
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetProjectManagersQuery,
  useGetProjectsQuery, // <-- export the new hook here
} = projectApi;
