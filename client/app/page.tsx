import Link from "next/link";
import Image from "next/image";
import { SignIn } from "./components/signin/signin";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen flex-col">
      <SignIn />
    </main>
  );
}
