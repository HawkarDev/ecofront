import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Backend URL
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
    getFiles: builder.query<Array<{ id: string; url: string; type: string }>, void>({
      query: () => '/files',
    }),
  }),
});

export const { useUploadFileMutation, useGetFilesQuery } = api;