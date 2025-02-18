// app/components/FileList.tsx
"use client";
import React from "react";
import { useGetFilesQuery } from "../services/api";

const FileListComp: React.FC = () => {
  const { data: files, isLoading, isError } = useGetFilesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching files</div>;

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files?.map((file) => (
          <li key={file.id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.type} - {file.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileListComp;
