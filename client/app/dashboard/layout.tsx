"use client";

import React from "react";
import { SignIn } from "../components/signin/signin";
import useAuth from "@/lib/hooks/useAuth";
import { Navbar } from "../components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = useAuth();

  // TODO: To be set up in future commit
  // const isAuthenticated = false;
  return isAuthenticated ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <SignIn />
  );
};

export default DashboardLayout;
