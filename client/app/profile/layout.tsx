<<<<<<< HEAD

const Profile = () => {
  return <div className="w-full h-full">
    <div className="flex">
      <div className="profile w-24 h-24 rounded-full bg-red-50">
        <div>{}</div>
      </div>
    </div>
  </div>
}

export default Profile;
=======
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
>>>>>>> profile
