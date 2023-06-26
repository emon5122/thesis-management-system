"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Something() {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      Something
      <Link href={"/"}>Go to Home</Link>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Go to home client sided
      </button>
    </div>
  );
}
