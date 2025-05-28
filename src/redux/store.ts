import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "./projectApi";
import { masterLookupApi} from "./MasterLookupApi"
import { detailedLookupApi } from './DetailedLookupApi';


export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [ masterLookupApi.reducerPath]:  masterLookupApi.reducer,
    [detailedLookupApi.reducerPath]: detailedLookupApi.reducer,
  },
  
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectApi.middleware)
      .concat(masterLookupApi.middleware)
      .concat(detailedLookupApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

