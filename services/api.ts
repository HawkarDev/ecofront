// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }), // Backend URL
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { username: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    uploadFile: builder.mutation({
      query: (formData: FormData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
    getFiles: builder.query<
      Array<{
        id: string;
        url: string;
        type: string;
        metadata: {
          name: string;
          category: string;
          owner: string;
          date: string;
          tags: string[];
        };
      }>,
      void
    >({
      query: () => "/files",
    }),
  }),
});

export const {  useLoginMutation,
  useLogoutMutation,
  useUploadFileMutation,
  useGetFilesQuery } = api;