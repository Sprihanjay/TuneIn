import Link from "next/link";
import Image from "next/image";
import { SignIn } from "./components/signin/signin";
import useAuth from "@/lib/hooks/useAuth";

export default function Home() {
  return (
    <main>
      <h1>Test</h1>
      <Link href="/dashboard">
        <button>Apples</button>
      </Link>
    </main>
  );
}
