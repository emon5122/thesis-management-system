"use client";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="w-full h-full px-5 py-20">
      <div className="py-8 flex justify-center">
        <div className="w-full max-w-xs ">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Log In
              </button>
            </div>
            <br></br>
            <div className="text-gray-400	text-sm	">
              Don't have any account yet?<> </>
              <Link className="text-blue-700	" href="/signup">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
