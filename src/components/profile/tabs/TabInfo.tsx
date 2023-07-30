"use client";

import { myAxios } from "@/lib/myaxios";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

const TabInfo = ({ user, id }: any) => {
  const { data: grade } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get(`evaluation/${id}`);
      return value.data;
    },

    queryKey: ["grade"],
    staleTime: 300000,
  });
  const { data: count } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get(`teacher-count/${id}`);
      return value.data;
    },

    queryKey: ["count"],
    staleTime: 300000,
  });

  const { data: evcount } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get(`evaluation-count/${id}`);
      return value.data;
    },

    queryKey: ["evcount"],
    staleTime: 300000,
  });
  console.log(evcount?.evaluationCount);
  console.log(count?.teacherCount + 1);
  const { data: session } = useQuery({
    queryFn: async () => {
      return await getSession();
    },
    queryKey: ["session"],
    staleTime: 60000,
  });
  const { data: thesis } = useQuery({
    queryFn: async () => {
      const res = await myAxios.get(`grade/${id}`);
      return res.data;
    },
    queryKey: ["thesis"],
    staleTime: 50000,
  });

  return (
    <div>
      <div className="border-2 border-dashed border-white shadow-lg p-6">
        <div className="flex justify-center text-4xl font-serif text-white  shadow-md mb-4">
          About Me
        </div>
        <div className="flex flex-col font-serif text-white gap-2">
          <div className="grid grid-cols-6">
            <div className="col-span-2 capitalize">NAME</div>
            <div className="col-span-1">{":"}</div>
            <div className="col-span-3">{user?.name}</div>
          </div>
          <hr />
          <div className="grid grid-cols-6">
            <div className="col-span-2">EMAIL</div>
            <div className="col-span-1">{":"}</div>
            <div className="col-span-3">{user?.email}</div>
          </div>
          <hr />
          <div className="grid grid-cols-6">
            <div className="col-span-2">ROLE</div>
            <div className="col-span-1">{":"}</div>
            <div className="col-span-3">{user?.role}</div>
          </div>
          {session?.user.id === thesis?.supervisorId ? (
            <div className="grid grid-cols-6">
              <div className="col-span-2">GRADE</div>
              <div className="col-span-1">{":"}</div>
              {evcount?.evaluationCount  !== undefined && count?.teacherCount !== undefined ? (
                evcount?.evaluationCount === count?.teacherCount+1  ? (
                  <div className="col-span-3">{grade?.totalGrade}</div>
                ) : (
                  <div className="col-span-3">N/A</div>
                )
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default TabInfo;
