"use client";
import React from "react";
import { useGetFilesQuery } from "../services/api";

const TextList: React.FC = () => {
  const { data: files, isLoading, isError } = useGetFilesQuery();

  if (isLoading)
    return <div className="text-center text-lg p-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-lg text-red-500 p-4">
        Error fetching files
      </div>
    );

  const textFiles = files?.filter(
    (file) =>
      (file.type && file.type?.toLowerCase().startsWith("text/")) ||
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );

  return (
    <div className="min-h-[calc(100vh-12vh-10vh)] bg-gray-100 ">
      <h1 className="text-2xl capitalize text-center font-bold bg-blue-500 text-white p-4 m-4">
        Uploaded Text Files
      </h1>
      <div className="flex justify-center items-center mt-8 bg-red-600">
        <ul className="w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 bg-lime-500">
          {textFiles && textFiles.length > 0 ? (
            textFiles.map((file) => (
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
            <p className="text-center text-lg">No text files found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TextList;
