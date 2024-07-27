"use client";

import React from "react";
import { SignIn } from "../components/signin/signin";
import useAuth from "@/lib/hooks/useAuth";

const Dashboard = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <div>{children}</div> : <SignIn />;
};

export default Dashboard;
