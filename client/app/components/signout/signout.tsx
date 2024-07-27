"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/clientApp";
import { signOut } from "firebase/auth";
import React from "react";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");

    return <button onClick={handleSignOut}>Sign Out</button>;
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
