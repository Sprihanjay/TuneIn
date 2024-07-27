import Link from "next/link";

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
