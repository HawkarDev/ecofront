"use client";
import React, { useRef, useState } from "react";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = !!localStorage.getItem("adminToken");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!isAdmin) {
      setMessage("You do not have permission to upload files.");
      return;
    }

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("category", category);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      console.log("Response status:", response.status); // Log the status
      console.log("Response headers:", response.headers); // Log the headers

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        console.error("Error response:", errorData); // Log the error response
        throw new Error(errorData.message || "Failed to upload file");
      }

      const data = await response.json();
      console.log("Upload response:", data); // Log the success response

      setMessage("File uploaded successfully!");
      setFile(null);
      setName("");
      setCategory("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error); // Log the error
      if (error instanceof Error) {
        setMessage(error.message || "Failed to upload file. Please try again.");
      } else {
        setMessage("Failed to upload file. Please try again.");
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12vh-10vh)] p-8">
        <p className="text-red-500 text-lg">
          You do not have permission to upload files.
        </p>
        <p className="text-blue-500 hover:underline">
          <a href="/admin-login">Login as Admin</a>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 h-[calc(100vh-12vh-10vh)] items-center p-8">
      <h1 className="text-2xl uppercase font-bold text-center">Upload Files</h1>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="p-2 border rounded w-full max-w-md"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="File Name"
        className="p-2 border rounded w-full max-w-md"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="File Category"
        className="p-2 border rounded w-full max-w-md"
      />
      <button
        onClick={handleSubmit}
        disabled={!file || !name || !category}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 w-full max-w-md"
      >
        Upload
      </button>
      {message && (
        <p
          className={`text-sm ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
