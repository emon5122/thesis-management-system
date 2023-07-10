"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

let PATHS = [];

const Navbar = () => {
    const session = useSession();
    const pathName = usePathname();
    const hideHeader = pathName.startsWith("/dashboard");
    if (session.status === "unauthenticated") {
        PATHS = [
            { path: "/", name: "Home" },
            { path: "/papers", name: "Published papers" },
            { path: "/api/auth/signin", name: "Log in" },
            { path: "/signup", name: "Sign up" },
        ];
    } else {
        PATHS = [
            { path: "/", name: "Home" },
            { path: "/papers", name: "Published papers" },
            { path: "/api/auth/signout", name: "Log out" },
        ];
    }
    if (!hideHeader) {
        return (
            <div className="w-screen flex justify-between items-center py-4 bg-neutral-400 	">
                <Link href="/" className="flex ml-10 gap-2 cursor-pointer">
                    <Image src="/logo.png" alt="logo" width={40} height={40} />
                    <div className="text-xl text-white">
                        Thesis Management System
                    </div>
                </Link>
                <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
                    {PATHS.map((p, index) => {
                        return (
                            <li key={index} className="mx-2">
                                <Link href={p.path}>
                                    <span
                                        className={
                                            pathName.toLowerCase() ===
                                            p.path.toLowerCase()
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
                        <div>Hi, {session.data.user.name}</div>
                    )}
                </ul>
            </div>
        );
    }
};

export default Navbar;
