"use client";
import { getSession } from "next-auth/react";
import { useQueries } from "@tanstack/react-query";

const Page = () => {
    const results = useQueries({
        queries: [
            {
                queryFn: async () => {
                    return await getSession();
                },
                queryKey: ["session"],
                staleTime: 60000,
            },
        ],
    });
    const { data: session, isLoading, isError, error } = results[0];
    if (!isLoading && !isError) {
        return (
            <div className="flex justify-center items-center flex-col w-full">
                <div className="border-2 border-slate-600 p-6">
                    <div className="flex justify-center text-4xl font-semibold text-slate-800 italic underline mb-4">
                        About Me
                    </div>
                    <div className="flex flex-col font-semibold text-slate-800 gap-2">
                        <div className="grid grid-cols-6">
                            <div className="col-span-2 capitalize">NAME</div>
                            <div className="col-span-1">{":"}</div>
                            <div className="col-span-3">
                                {" "}
                                {session?.user?.name}
                            </div>
                        </div>
                        <hr />
                        <div className="grid grid-cols-6">
                            <div className="col-span-2">EMAIL</div>
                            <div className="col-span-1">{":"}</div>
                            <div className="col-span-3">
                                {session?.user?.email}
                            </div>
                        </div>
                        <hr />
                        <div className="grid grid-cols-6">
                            <div className="col-span-2">ROLE</div>
                            <div className="col-span-1">{":"}</div>
                            <div className="col-span-3">
                                {session?.user?.role}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        throw new Error(error as string);
    }
};

export default Page;
