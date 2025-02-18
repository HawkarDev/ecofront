// app/components/FileUpload.tsx
"use client";
import React, { useState } from "react";
import { useUploadFileMutation } from "../services/api";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        await uploadFile(file).unwrap();
        alert("File uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
