import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IRepository, IUser, ServerResponse } from "../../models/models";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (searchQuery: string) => ({
        url: "search/users",
        params: {
          q: searchQuery,
          per_page: 10,
        },
      }),
      transformResponse: (response: ServerResponse) => response.items,
    }),
    getUsersRepository: build.query<IRepository[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUsersRepositoryQuery } =
  githubApi;
