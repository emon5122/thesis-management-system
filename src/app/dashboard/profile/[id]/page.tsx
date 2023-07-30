"use client";
import ProfileTopNavigation from "../../../../components/profile/GeneralProfile";
import { myAxios } from "@/lib/myaxios";
import { ParamsType } from "@/types/api";
import { useQueries } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

export const revalidate="no-store"

const Profile = ({ params: { id } }: ParamsType) => {
  const results = useQueries({
    queries: [
      {
        queryFn: async () => {
          const student = await myAxios.get(`user/student/${id}`);
          return student.data;
        },
        queryKey: ["student", id],
        staleTime: 300000,
      },
      {
        queryFn: async () => {
          const attendance = await myAxios.get(`attendance/${id}`);
          return attendance.data;
        },
        queryKey: ["attendance", id],
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
          const task = await myAxios.get(`task/${id}`);
          return task.data;
        },
        queryKey: ["task", id],
        staleTime: 30000,
      },
    ],
  });
  const { data: user, isLoading:userLoading } = results[0];
  const { data: attendance } = results[1];
  const { data: session, isLoading: sessionLoading } = results[2];
  const { data: task } = results[3];

  if (userLoading || sessionLoading){
    return(<>Loading...</>)
  }
  return (
    <ProfileTopNavigation
      id={id}
      session={session}
      attendance={attendance}
      task={task}
      user={user}
    />
    
  );
};
export default Profile;
