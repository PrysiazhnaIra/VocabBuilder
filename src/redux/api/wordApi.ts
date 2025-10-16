import { createApi } from "@reduxjs/toolkit/query/react";
import type { CategoriesResponse } from "../../types/types";
import { baseQueryWithAuth } from "./baseQuery";

export const wordApi = createApi({
  reducerPath: "wordApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "/words/categories",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = wordApi;
