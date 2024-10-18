// Need to use the React-specific entry point to import createApi
import { ICommentResponse, INewsPageResponse } from "@/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_HACKERNEWS_API_URL;

export const hackerNewsApi = createApi({
  keepUnusedDataFor: 0,
  reducerPath: "hackerNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getNewsIds: builder.query<number[], void>({
      query: () => "newstories.json",
    }),
    getNews: builder.query<INewsPageResponse, number>({
      query: (id) => `item/${id}.json`,
    }),
    getComment: builder.query<ICommentResponse, number>({
      query: (id) => `item/${id}.json`,
    }),
  }),
});

export const { useGetNewsIdsQuery, useGetNewsQuery, useGetCommentQuery } =
  hackerNewsApi;
