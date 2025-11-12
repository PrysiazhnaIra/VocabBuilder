import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  AllWords,
  CategoriesResponse,
  GetWordsParams,
  UpdateWordBody,
  Word,
} from "../../types/types";
import { baseQueryWithAuth } from "./baseQuery";

const buildQueryParams = (params?: GetWordsParams) => {
  if (!params) {
    return undefined;
  }

  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  if (entries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(entries);
};

export const wordApi = createApi({
  reducerPath: "wordApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Categories", "Words"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "/words/categories",
      providesTags: ["Categories"],
    }),

    getWords: builder.query<AllWords, GetWordsParams | void>({
      query: (params) => {
        const queryParams = buildQueryParams(params);
        return queryParams
          ? {
              url: "/words/all",
              params: queryParams,
            }
          : "/words/all";
      },
      providesTags: ["Words"],
    }),

    deleteWord: builder.mutation<void, string>({
      query: (wordId) => ({
        url: `/words/delete/${wordId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Words"],
    }),

    updateWord: builder.mutation<
      Word,
      { wordId: string; editedBody: UpdateWordBody }
    >({
      query: ({ wordId, editedBody }) => ({
        url: `/words/edit/${wordId}`,
        method: "PATCH",
        body: editedBody,
      }),
      invalidatesTags: ["Words"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetWordsQuery,
  useDeleteWordMutation,
  useUpdateWordMutation,
} = wordApi;
