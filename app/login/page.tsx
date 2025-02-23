"use client";

import AdminLogin from "@/components/AdminLogin";
import React from "react";
import { useRouter } from "next/navigation";
const adminLogin = () => {
  const router = useRouter();
  return (
    <div>
      <AdminLogin router={router} />
    </div>
  );
};

export default adminLogin;
