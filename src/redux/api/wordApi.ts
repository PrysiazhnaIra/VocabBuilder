import { createApi } from "@reduxjs/toolkit/query/react";
import type { AllWords, CategoriesResponse } from "../../types/types";
import { baseQueryWithAuth } from "./baseQuery";

export const wordApi = createApi({
  reducerPath: "wordApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Categories", "Words"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "/words/categories",
      providesTags: ["Categories"],
    }),

    getWords: builder.query<AllWords, void>({
      query: () => "/words/all",
      providesTags: ["Words"],
    }),

    deleteWord: builder.mutation<void, string>({
      query: (wordId) => ({
        url: `/words/delete/${wordId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Words"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetWordsQuery,
  useDeleteWordMutation,
} = wordApi;
