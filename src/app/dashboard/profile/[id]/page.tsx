"use client";
import { myAxios } from "@/lib/myaxios";
import { ParamsType } from "@/types/api";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";

const Profile = ({ params: { id } }: ParamsType) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
    ],
  });
  const { data: user } = results[0];
  const { data: attendance } = results[1];

  const component = (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Info" value="1" />
              <Tab label="Attendance" value="2" />
              <Tab label="Tasks" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div>
              <div className="border-2 border-slate-600 p-6">
                <div className="flex justify-center text-4xl font-semibold text-slate-800 italic underline mb-4">
                  About Me
                </div>
                <div className="flex flex-col font-semibold text-slate-800 gap-2">
                  <div className="grid grid-cols-6">
                    <div className="col-span-2 capitalize">NAME</div>
                    <div className="col-span-1">{":"}</div>
                    <div className="col-span-3"> {user?.name}</div>
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
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div>{JSON.stringify(attendance)}</div>
          </TabPanel>
          <TabPanel value="3">Task data</TabPanel>
        </TabContext>
      </Box>
    </>
  );
  return component;
};
export default Profile;
