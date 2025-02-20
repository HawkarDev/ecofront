// // app/components/FileUpload.tsx
// "use client";
// import React, { useRef, useState } from "react";
// import { useUploadFileMutation } from "../services/api";

// const FileUpload: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadFile, { isLoading }] = useUploadFileMutation();
//   const fileInputRef = useRef<HTMLInputElement>(null); // Reference for file input

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!file) return alert("Please select a file first.");

//     try {
//       await uploadFile(file).unwrap();
//       alert("File uploaded successfully!");
//       setFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = ""; // Reset file input field
//       }
//     } catch (error) {
//       console.error("Failed to upload file:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} ref={fileInputRef} />
//       <button onClick={handleSubmit} disabled={isLoading}>
//         {isLoading ? "Uploading..." : "Upload"}
//       </button>
//     </div>
//   );
// };

// export default FileUpload;

// "use client";
// import React, { useRef, useState } from "react";
// import { useUploadFileMutation } from "../services/api";

// const FileUpload: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState<string | null>(null);
//   const [uploadFile, { isLoading }] = useUploadFileMutation();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFile = e.target.files[0];
//       const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
//       if (!allowedTypes.includes(selectedFile.type)) {
//         setMessage(
//           "Invalid file type. Please upload a JPEG, PNG, or PDF file."
//         );
//         return;
//       }
//       setFile(selectedFile);
//       setMessage(null);
//     }
//   };

//   const getErrorMessage = (error: unknown): string => {
//     if (typeof error === "object" && error !== null && "data" in error) {
//       return (error as { data: { message: string } }).data.message;
//     }
//     return "Failed to upload file. Please try again.";
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       setMessage("Please select a file first.");
//       return;
//     }

//     try {
//       await uploadFile(file).unwrap();
//       setMessage("File uploaded successfully!");
//       setFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     } catch (error) {
//       setMessage(getErrorMessage(error));
//       console.error("Failed to upload file:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-4 h-[calc(100vh-12vh-10vh)] items-center p-8">
//       <h1 className="text-2xl uppercase font-bold text-center">Upload Files</h1>
//       <label htmlFor="file-upload" className="sr-only text-cente">
//         Choose a file
//       </label>
//       <input
//         id="file-upload"
//         type="file"
//         onChange={handleFileChange}
//         ref={fileInputRef}
//         className="p-2 border rounded"
//       />
//       <button
//         onClick={handleSubmit}
//         disabled={isLoading}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 w-3/4 items-center"
//       >
//         {isLoading ? "Uploading..." : "Upload"}
//       </button>
//       {file && (
//         <p className="text-sm text-gray-600">Selected file: {file.name}</p>
//       )}
//       {message && <p className="text-sm text-red-500">{message}</p>}
//     </div>
//   );
// };

// export default FileUpload;

"use client";
import React, { useRef, useState } from "react";
import { useUploadFileMutation } from "../services/api";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
        "audio/mpeg", // MP3
        "audio/wav", // WAV
        "audio/ogg", // OGG
        "audio/x-m4a", // M4A
        "audio/flac", // FLAC
        "video/mp4", // MP4
        "video/webm", // WEBM
        "video/quicktime", // MOV
        "video/x-msvideo", // AVI
        "video/x-matroska", // MKV
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage(
          "Invalid file type. Please upload a JPEG, PNG, or PDF file."
        );
        return;
      }
      setFile(selectedFile);
      setMessage(null);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === "object" && error !== null && "data" in error) {
      return (error as { data: { message: string } }).data.message;
    }
    return "Failed to upload file. Please try again.";
  };

  const handleSubmit = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("category", category);

    try {
      await uploadFile(formData).unwrap();
      setMessage("File uploaded successfully!");
      setFile(null);
      setName("");
      setCategory("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setMessage(getErrorMessage(error));
      console.error("Failed to upload file:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 h-[calc(100vh-12vh-10vh)] items-center p-8">
      <h1 className="text-2xl uppercase font-bold text-center">Upload Files</h1>
      <label htmlFor="file-upload" className="sr-only text-center">
        Choose a file
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="p-2 border rounded"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="File Name"
        className="p-2 border rounded"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="File Category"
        className="p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 w-3/4 items-center"
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>
      {file && (
        <p className="text-sm text-gray-600">Selected file: {file.name}</p>
      )}
      {message && <p className="text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default FileUpload;
