"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, NavButton } from "./ui/nav-bar-menu";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/clientApp";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <div className="relative w-full flex items-center justify-center py-10 bg-customone">
      <NavbarHelper className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function NavbarHelper({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");

    return <button onClick={handleSignOut}>Sign Out</button>;
  };

  return (
    <div
      className={cn(
        "absolute top-10 inset-x-0 max-w-3xl mx-auto z-50",
        className
      )}>
      <Menu setActive={setActive}>
        <NavButton item="Dashboard" href="/dashboard" />
        <NavButton item="Create Posting" href="/create-post" />
        <NavButton item="Song Insights" href="/song-insights" />
        <NavButton item="Profile" href="/profile" />
        <NavButton item="Sign out" href="/" onClick={handleSignOut} />
      </Menu>
    </div>
  );
}
