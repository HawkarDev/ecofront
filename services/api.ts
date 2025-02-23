// // services/api.ts
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000", // Backend URL
//   prepareHeaders: (headers, { getState }) => {
//     // Get the token from the state (assuming you store it in the `auth` slice)
//     const token = (getState() as RootState).auth.token;

//     // If the token exists, add it to the headers
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery,
//   endpoints: (builder) => ({
//     login: builder.mutation<{ token: string }, { username: string; password: string }>({
//       query: (credentials) => ({
//         url: "/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     logout: builder.mutation<void, void>({
//       query: () => ({
//         url: "/logout",
//         method: "POST",
//       }),
//     }),
//     uploadFile: builder.mutation({
//       query: (formData: FormData) => ({
//         url: "/upload",
//         method: "POST",
//         body: formData,
//       }),
//     }),
//     deleteFile: builder.mutation<void, string>({
//       query: (fileId) => ({
//         url: `/files/${fileId}`,
//         method: "DELETE",
//       }),
//     }),
//     updateFile: builder.mutation<void, { fileId: string; metadata: any }>({
//       query: ({ fileId, metadata }) => ({
//         url: `/files/${fileId}`,
//         method: "PUT",
//         body: metadata,
//       }),
//     }),
//     getFiles: builder.query<
//       Array<{
//         id: string;
//         url: string;
//         type: string;
//         metadata: {
//           name: string;
//           category: string;
//           owner: string;
//           date: string;
//           tags: string[];
//         };
//       }>,
//       void
//     >({
//       query: () => "/files",
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useUploadFileMutation,
//   useGetFilesQuery,
//   useDeleteFileMutation,
//   useUpdateFileMutation,
// } = api;


// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000", // Backend URL
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; // Get the token from Redux state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Include the token in headers
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
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
    deleteFile: builder.mutation<void, string>({
      query: (fileId) => ({
        url: `/files/${fileId}`,
        method: "DELETE",
      }),
    }),
    updateFile: builder.mutation<void, { fileId: string; metadata: any }>({
      query: ({ fileId, metadata }) => ({
        url: `/files/${fileId}`,
        method: "PUT",
        body: metadata,
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

export const {
  useLoginMutation,
  useLogoutMutation, // Ensure this is exported
  useUploadFileMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
  useUpdateFileMutation,
} = api;