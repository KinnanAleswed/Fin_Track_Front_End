import type {
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
  EndpointBuilder,
} from "@reduxjs/toolkit/query";

import type {
  NewProjectRequest,
  NewProjectResponse,
} from "../../../redux/types";

type MyBuilder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  "Project",
  "projectApi"
>;

export const addProject = (builder: MyBuilder) =>
  builder.mutation<NewProjectResponse, NewProjectRequest>({
    query: (projectData) => ({
      url: "/projects",
      method: "POST",
      body: projectData,
    }),
    invalidatesTags: ["Project"],
  });
