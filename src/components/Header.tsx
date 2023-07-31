"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

let PATHS = [];

const Navbar = () => {
  const session = useSession();
  const pathName = usePathname();
  const hideHeader =
    pathName.startsWith("/dashboard") ||
    pathName === "/signup" ||
    pathName === "/login";
  if (session.status === "unauthenticated") {
    PATHS = [
      { path: "/", name: "Home" },

      { path: "/login", name: "Log in" },
      { path: "/signup", name: "Sign up" },
    ];
  } else {
    PATHS = [{ path: "/", name: "Home" }];
  }
  if (!hideHeader) {
    return (
      <div className="w-screen flex justify-between items-center py-4 bg-neutral-400 	">
        <Link href="/" className="flex ml-10 gap-2 cursor-pointer">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div className="text-xl text-white">Thesis Management System</div>
        </Link>
        <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
          {PATHS.map((p, index) => {
            return (
              <li key={index} className="mx-2">
                <Link href={p.path}>
                  <span
                    className={
                      pathName.toLowerCase() === p.path.toLowerCase()
                        ? "text-green-600 hover:text-blue-500 underline"
                        : "text-white hover:text-blue-500"
                    }
                  >
                    {p.name.toUpperCase()}
                  </span>
                </Link>
              </li>
            );
          })}

          {session.data?.user && (
            <>
              <Link
                href={""}
                className="text-white hover:text-blue-500 uppercase"
                onClick={(e) => {
                  e.preventDefault(), signOut();
                }}
              >
                Log out
              </Link>
              <Link
                className="text-white hover:text-blue-500 ml-2"
                href={"/dashboard"}
              >
                Hi, {session.data.user.name}
              </Link>
            </>
          )}
        </ul>
      </div>
    );
  }
};

export default Navbar;
