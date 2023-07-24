"use client";
import { myAxios } from "@/lib/myaxios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const List = () => {
  const { data: studentlist = [] } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get("evaluatablelist");
      return value.data;
    },

    queryKey: ["evaluatablelist"],
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

        <tbody>
          {studentlist.map((thesis: any) => {
            console.log(thesis);
            return (
              <tr className="text-white border-t-2 mb-2" key={thesis.id}>
                <td className="text-lg text-center">
                  <Link
                    className="underline hover:text-green-800"
                    href={`/dashboard/profile/${thesis.student.id}`}
                  >
                    {thesis.student.name}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
