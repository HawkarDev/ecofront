"use client";
import React, { useState } from "react";
import {
  useGetFilesQuery,
  useDeleteFileMutation,
  useUpdateFileMutation,
} from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// Define a type for the error structure returned by RTK Query
interface ApiError {
  status: number;
  data?: {
    message?: string;
  };
  error?: string;
}

const Texts: React.FC = () => {
  const { data: files, isLoading, isError, refetch } = useGetFilesQuery();
  const [deleteFile] = useDeleteFileMutation();
  const [updateFile] = useUpdateFileMutation();
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [updatedMetadata, setUpdatedMetadata] = useState({
    name: "",
    category: "",
  });
  const token = useSelector((state: RootState) => state.auth.token); // Get the token from Redux state
  const isAdmin = !!token; // Check if user is admin

  // Type guard to check if the error is of type ApiError
  const isApiError = (error: unknown): error is ApiError => {
    return (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      "data" in error
    );
  };

  const handleDelete = async (fileId: string) => {
    if (!isAdmin) {
      console.error("You do not have permission to delete files.");
      return;
    }

    try {
      await deleteFile(fileId).unwrap();
      refetch(); // Refresh the list after deletion
    } catch (err) {
      if (isApiError(err)) {
        if (err.status === 401 || err.status === 400) {
          console.error("Authentication failed. Please log in again.");
          window.location.href = "/login"; // Redirect to login page
        } else {
          console.error("Failed to delete file:", {
            status: err.status,
            message: err.data?.message || "Unknown error",
            error: err.error,
          });
        }
      } else {
        console.error("Failed to delete file:", err);
      }
    }
  };

  const handleUpdate = async (fileId: string) => {
    if (!isAdmin) {
      console.error("You do not have permission to update files.");
      return;
    }

    try {
      await updateFile({ fileId, metadata: updatedMetadata }).unwrap();
      setEditingFileId(null); // Exit edit mode
      refetch(); // Refresh the list after update
    } catch (err) {
      if (isApiError(err)) {
        if (err.status === 401 || err.status === 400) {
          console.error("Authentication failed. Please log in again.");
          window.location.href = "/login"; // Redirect to login page
        } else {
          console.error("Failed to update file:", {
            status: err.status,
            message: err.data?.message || "Unknown error",
            error: err.error,
          });
        }
      } else {
        console.error("Failed to update file:", err);
      }
    }
  };

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
    <div className="min-h-[calc(100vh-12vh-10vh)] bg-gray-100">
      <h1 className="text-2xl capitalize text-center font-bold bg-blue-500 text-white p-4 m-4">
        Uploaded Text Files
      </h1>
      <div className="flex justify-center items-center mt-8">
        <ul className="w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {textFiles && textFiles.length > 0 ? (
            textFiles.map((file) => (
              <li
                key={file.id}
                className="bg-white p-4 rounded shadow text-center"
              >
                {editingFileId === file.id ? (
                  // Edit mode
                  <div>
                    <input
                      type="text"
                      value={updatedMetadata.name}
                      onChange={(e) =>
                        setUpdatedMetadata({
                          ...updatedMetadata,
                          name: e.target.value,
                        })
                      }
                      placeholder="Name"
                      className="mb-2 p-2 border rounded w-full"
                    />
                    <input
                      type="text"
                      value={updatedMetadata.category}
                      onChange={(e) =>
                        setUpdatedMetadata({
                          ...updatedMetadata,
                          category: e.target.value,
                        })
                      }
                      placeholder="Category"
                      className="mb-2 p-2 border rounded w-full"
                    />
                    <button
                      onClick={() => handleUpdate(file.id)}
                      className="bg-green-500 text-white p-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingFileId(null)}
                      className="bg-gray-500 text-white p-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  // View mode
                  <div>
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
                    {isAdmin && ( // Only show buttons for admins
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            setEditingFileId(file.id);
                            setUpdatedMetadata({
                              name: file.metadata?.name || "",
                              category: file.metadata?.category || "",
                            });
                          }}
                          className="bg-yellow-500 text-white p-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(file.id)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
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

export default Texts;
