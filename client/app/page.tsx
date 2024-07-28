import Link from "next/link";
import Image from "next/image";
import { SignIn } from "./components/signin/signin";
import useAuth from "@/lib/hooks/useAuth";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-customone flex flex-col justify-center items-center text-center ">
      <h1 className="text-customfive text-7xl font-bold mb-4">
        Welcome to
        <span className=" text-cyan-200 cursor-pointer">
          {" "}
          Tune
          <span className="text-cyan-400">In</span>
        </span>
      </h1>
      <h2 className="text-customfour text-xl font-medium mb-24">
        Your one stop shop to finding the best music gigs
      </h2>
      <Link href="/dashboard">
        <button className="mx-auto shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-cyan-100 dark:text-neutral-200 transition duration-200">
          Get Started
        </button>
      </Link>
    </main>
  );
}
