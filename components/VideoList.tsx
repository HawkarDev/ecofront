"use client";
import React from "react";
import { useGetFilesQuery } from "../services/api";

const VideoList: React.FC = () => {
  const { data: files, isLoading, isError } = useGetFilesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching files</div>;

  // Filter only video files
  const videoFiles = files?.filter(
    (file) => file.type && file.type?.toLowerCase().startsWith("video/")
  );
  console.log(files);
  console.log(videoFiles);
  return (
    <div className=" h-[calc(100vh-12vh-10vh)]">
      <h1 className="text-2xl capitalize text-center font-bold forced-colors:bg-slate-900 p-4 m-4">
        Uploaded Video Files
      </h1>

      {videoFiles && videoFiles.length > 0 ? (
        <ul>
          {videoFiles.map((file) => (
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

export default VideoList;
