"use client";
import React from "react";
import { useGetFilesQuery } from "../services/api";

const VoiceList: React.FC = () => {
  const { data: files, isLoading, isError } = useGetFilesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching files</div>;

  // Filter only video files
  const voiceFiles = files?.filter(
    (file) => file.type && file.type?.toLowerCase().startsWith("voice/")
  );
  console.log(files);
  console.log(voiceFiles);
  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl capitalize text-center pt-40 w-auto">
        Uploaded Video Files
      </p>
      <h2>Uploaded Video Files</h2>
      {voiceFiles && voiceFiles.length > 0 ? (
        <ul>
          {voiceFiles.map((file) => (
            <li key={file.id}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.type} - {file.url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No video files found</p>
      )}
    </div>
  );
};

export default VoiceList;
