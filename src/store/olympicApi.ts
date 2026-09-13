import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Country } from "../models/olympic.model";
import { data } from "../hooks/useData";

// On définit notre "API"
export const olympicApi = createApi({
  reducerPath: "olympicApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getOlympics: builder.query<Country[], void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        return { data };
      },
    }),
  }),
});

export const { useGetOlympicsQuery } = olympicApi;
