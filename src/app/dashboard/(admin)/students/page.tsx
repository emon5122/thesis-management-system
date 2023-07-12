"use client";
import { myAxios } from "@/lib/myaxios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { z } from "zod";

const List = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get("user/student");
      return z
        .array(z.object({ id: z.string().uuid(), name: z.string() }))
        .parse(value.data);
    },
    queryKey: ["students"],
    staleTime: 300000,
  });
  return (
    <div className="h-screen">
      <table className="m-auto border-2 ">
        <thead>
          <tr className="text-white">
            <th className="px-8 m-1 bg-cyan-700">Student Name</th>
          </tr>
        </thead>
        {data &&
          data.map((student) => {
            return (
              <tbody key={student.id}>
                <tr className="text-white border-t-2 mb-2">
                  <td className="text-lg text-center">
                    <Link
                      className="underline hover:text-green-800"
                      href={`/dashboard/profile/${student.id}`}
                    >
                      {" "}
                      {student.name}
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default List;
