"use client";

import { myAxios } from "@/lib/myaxios";
import { useQuery } from "@tanstack/react-query";

const TabInfo = ({ user, session, id }: any) => {
  const { data: grade } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get(`evaluation/${id}`);
      return value.data;
    },

    queryKey: ["grade"],
    staleTime: 300000,
  });
  const { data: count,isLoading } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get(`result-publishable/${id}`);
      return value.data;
    },
    queryKey: ["result-publishable",id],
    staleTime: 300000,
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
          { ((session?.user?.id === user?.thesisAsStudent?.supervisorId) || (session?.user?.role === "ADMIN")) && (
            <div className="grid grid-cols-6">
              <div className="col-span-2">GRADE</div>
              <div className="col-span-1">{":"}</div>

              {!isLoading && count?.isGrade ? (
                <div className="col-span-3">{grade?.totalGrade}</div>
              ) : (
                <div className="col-span-3">N/A</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TabInfo;
