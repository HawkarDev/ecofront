import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://economic-backend-2jfhkqozq-hawkardevs-projects.vercel.app", // Use your actual backend URL dg
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Files"],
  endpoints: (builder) => ({
    // ✅ FIXED: Use /api/admin/login instead of /login
    login: builder.mutation<
      { token: string; message: string; user: { username: string } },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/api/admin/login", // ← FIXED PATH
        method: "POST",
        body: credentials,
      }),
    }),

    // ✅ FIXED: Use /api/admin/profile for logout or remove if not needed
    // logout: builder.mutation<void, void>({
    //   query: () => ({
    //     url: "/api/admin/logout", // You might not have this endpoint
    //     method: "POST",
    //   }),
    // }),

    // ✅ FIXED: Use /api/upload instead of /upload
    uploadFile: builder.mutation<{ message: string; file: unknown }, FormData>({
      query: (formData) => ({
        url: "/api/upload", // ← FIXED PATH
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Files"],
    }),

    // ✅ FIXED: Use /api/files/:id instead of /files/:id
    deleteFile: builder.mutation<{ message: string }, string>({
      query: (fileId) => ({
        url: `/api/files/${fileId}`, // ← FIXED PATH
        method: "DELETE",
      }),
      invalidatesTags: ["Files"],
    }),

    // ❌ Remove or update - your backend might not have update endpoint
    updateFile: builder.mutation<void, { fileId: string; metadata: unknown }>({
      query: ({ fileId, metadata }) => ({
        url: `/api/files/${fileId}`, // ← FIXED PATH
        method: "PUT",
        body: metadata,
      }),
      invalidatesTags: ["Files"],
    }),

    // ✅ FIXED: Use /api/files instead of /files
    getFiles: builder.query<
      Array<{
        id: string;
        name: string;
        url: string;
        type: string;
        viewUrl: string;
        createdTime: string;
        size: string;
      }>,
      void
    >({
      query: () => "/api/files", // ← FIXED PATH
      providesTags: ["Files"],
    }),
  }),
});

export const {
  useLoginMutation,

  useUploadFileMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
  useUpdateFileMutation,
} = api;
