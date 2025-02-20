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

  return (
    <div className="min-h-[calc(100vh-12vh-10vh)] bg-gray-100 ">
      <h1 className="text-2xl capitalize text-center font-bold bg-blue-500 text-white p-4 m-4">
        Uploaded Vedio Files
      </h1>
      <div className="flex justify-center items-center mt-8 bg-red-600">
        <ul className="w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 bg-lime-500">
          {videoFiles && videoFiles.length > 0 ? (
            videoFiles.map((file) => (
              <li
                key={file.id}
                className="bg-white p-4 rounded shadow text-center"
              >
                <p>
                  <strong>Name:</strong> {file.metadata?.name || "No name"}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {file.metadata?.category || "No category"}
                </p>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <strong>URL:</strong> Click here
                </a>
              </li>
            ))
          ) : (
            <p className="text-center text-lg">No vedio files found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default VideoList;
