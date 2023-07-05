"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const PATHS = [
  { path: "/", name: "Home" },
  { path: "/papers", name: "Published papers" },
  {path:"/login",name:"Log in"},
  {path:"/signup",name:"Sign up"}
];

const Header = () => {
  const pathName = usePathname();

  return (
    <header className="w-screen flex fixed justify-between items-center py-4 bg-neutral-400 	">

      <Link href="/" className="flex ml-10 gap-2 cursor-pointer">
        <Image src="/logo.png" alt="logo" width={40}
        height={40} />
        <div className="text-xl text-white">Thesis Management System</div>
      </Link>
      <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
        {PATHS.map((p, index) => {
          return (
            <li key={index} className="mx-2">
              <Link
                href={p.path}
                
              >
                <span className={
                  pathName.toLowerCase() === p.path.toLowerCase()
                    ? "text-green-600 hover:text-blue-500 underline"
                    : "text-white hover:text-blue-500"
                }>{p.name.toUpperCase()}</span>
              </Link>
            </li>
          );
        })}
       
      </ul>
    </header>
  );
};

export default Header;
