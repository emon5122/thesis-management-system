import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>Hi</div>
      <Link href={"/something"}>Go to Something</Link>
    </main>
  );
}
