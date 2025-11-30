"use client";

import React, { useState } from "react";
import { useLoginMutation } from "../services/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useRouter } from "next/navigation";

// Define proper types for the login response
interface LoginResponse {
  token: string;
}

interface LoginError {
  data?: {
    message?: string;
  };
}

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (): Promise<void> => {
    try {
      const response = (await login({
        username,
        password,
      }).unwrap()) as LoginResponse;

      // ✅ Fixed: Check if we're on client side before using localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.token);
      }
      console.log("Login successful, token:", response.token);

      dispatch(loginSuccess({ token: response.token }));
      alert("Login successful!");
      router.push("/uploadfiles");
    } catch (err: unknown) {
      const typedError = err as LoginError;
      if (typedError?.data?.message) {
        setError(typedError.data.message as string);
      } else {
        setError("An error occurred. Please try againwww.");
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        className="mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
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
