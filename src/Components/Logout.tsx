"use client";
import { signOut } from "next-auth/react";

const LogOut = () => {
    return (
        <button
            className="flex items-center p-2 rounded-lg text-white hover:bg-cyan-600 group"
            onClick={(e) => {
                e.preventDefault(), signOut();
            }}
        >
            <span className="ml-3">Logout</span>
        </button>
    );
};
export default LogOut;
