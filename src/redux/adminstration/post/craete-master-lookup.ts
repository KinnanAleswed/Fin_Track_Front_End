import type {
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
  EndpointBuilder,
} from "@reduxjs/toolkit/query";

import type {
  NewMasterLookup,
  NewMasterLookupResponde
} from "../../types/masterLookupTypes";
type MyBuilder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  "MasterLookup",
  "MasterLookupApi"
>;
export const addMasterLookup = (builder: MyBuilder) =>
  builder.mutation<NewMasterLookup , NewMasterLookupResponde>({
    query: (MasterLookupData) => ({
      url: "/projects",
      method: "POST",
      body: MasterLookupData,
    }),
    invalidatesTags: ["MasterLookup"],
  });