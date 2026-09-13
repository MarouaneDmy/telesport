import { configureStore } from "@reduxjs/toolkit";
import { olympicApi } from "./olympicApi";

export const store = configureStore({
  reducer: {
    [olympicApi.reducerPath]: olympicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(olympicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
