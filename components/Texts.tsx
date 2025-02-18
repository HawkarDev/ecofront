"use client";
import React from "react";
import { useGetFilesQuery } from "../services/api";

const TextList: React.FC = () => {
  const { data: files, isLoading, isError } = useGetFilesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching files</div>;

  // Filter only video files
  const textFiles = files?.filter(
    (file) => file.type && file.type.startsWith("text/")
  );

  console.log(files);
  console.log(textFiles);
  return (
    <div>
      <h2>Uploaded Text Files</h2>
      {textFiles && textFiles.length > 0 ? (
        <ul>
          {textFiles.map((file) => (
            <li key={file.id}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.type} - {file.url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Text files found</p>
      )}
    </div>
  );
};

export default TextList;
