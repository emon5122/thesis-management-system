"use client";
import { getSession } from "next-auth/react";
import { useQueries } from "@tanstack/react-query";
import StudentProfileTopNavigation from "@/components/profile/StudentProfile";
import { myAxios } from "@/lib/myaxios";

const Page = () => {
  const results = useQueries({
    queries: [
      {
        queryFn: async () => {
          const attendance = await myAxios.get("attendance");
          return attendance.data;
        },
        queryKey: ["attendance"],
        staleTime: 30000,
      },
      {
        queryFn: async () => {
          return await getSession();
        },
        queryKey: ["session"],
        staleTime: 60000,
      },
      {
        queryFn: async () => {
          const task = await myAxios.get("task");
          return task.data;
        },
        queryKey: ["task"],
        staleTime: 30000,
      },
      
    ],
  });

  const { data: attendance } = results[0];
  const { data: task } = results[2];
  const { data: session, isLoading, isError, error } = results[1];
  if (!isLoading && !isError) {
    if (session?.user?.role !== "STUDENT") {
      return (
        <div className="border-2 border-dashed border-white shadow-lg p-6">
        <div className="flex justify-center text-4xl font-serif text-white  shadow-md mb-4">
          About Me
        </div>
        <div className="flex flex-col font-serif text-white gap-2">
          <div className="grid grid-cols-6">
            <div className="col-span-2 capitalize">NAME</div>
            <div className="col-span-1">{":"}</div>
            <div className="col-span-3">{session?.user?.name}</div>
          </div>
          <hr />
          <div className="grid grid-cols-6">
            <div className="col-span-2">EMAIL</div>
            <div className="col-span-1">{":"}</div>
            <div className="col-span-3">{session?.user?.email}</div>
          </div>
          <hr />
          <div className="grid grid-cols-6">
            <div className="col-span-2">ROLE</div>
            <div className="col-span-1">{":"}</div>
            <div className="col-span-3">{session?.user?.role}</div>
          </div>
        </div>
      </div>
  
      );
    } else {
      return <StudentProfileTopNavigation session={session} attendance={attendance} task={task}/>
    }
  }
  if (error) {
    throw new Error(error as string);
  }
};

export default Page;
