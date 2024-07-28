"use client";

import React from "react";
import { SignIn } from "../components/signin/signin";
import useAuth from "@/lib/hooks/useAuth";
import { Navbar } from "../components/navbar";

const ProfileLayout = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <main className="flex justify-center items-center h-screen">
      <SignIn />
    </main>
  );
};

export default ProfileLayout;

