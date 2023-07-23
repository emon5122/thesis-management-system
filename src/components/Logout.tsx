"use client";
import { signOut } from "next-auth/react";

const LogOut = () => {
    return (
        <button
            className="flex items-center p-2 rounded-lg ml-3 text-white hover:bg-slate-400"
            onClick={(e) => {
                e.preventDefault(), signOut();
            }}
        >
            <span >Log out</span>
        </button>
    );
};
export default LogOut;
