"use client";
import React, { useState } from "react";
import { useLoginMutation } from "../services/api"; // Adjust the path as needed
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useRouter } from "next/router";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const route = useRouter();
  // RTK Query login mutation
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const response = await login({ username, password }).unwrap(); // Use the mutation

      // Save the token to localStorage
      localStorage.setItem("adminToken", response.token);
      // Update the login state
      dispatch(loginSuccess());
      alert("Login successful!");
      route.push("/");
    } catch (err) {
      // Handle errors
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof err.data === "object" &&
        err.data !== null &&
        "message" in err.data
      ) {
        setError(err.data.message as string); // Backend error message
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AdminLogin;
