"use client";
import { myAxios } from "@/lib/myaxios";
import { ParamsType } from "@/types/api";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Profile = ({ params: { id } }: ParamsType) => {
  const queryClient = useQueryClient();

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
      {
        queryFn: async () => {
          return await getSession();
        },
        queryKey: ["session"],
        staleTime: 60000,
      },
    ],
  });
  const { data: user } = results[0];
  const { data: attendance } = results[1];
  const { data: session } = results[2];

  // attendance table
  const columns: GridColDef[] = [
    { field: "weekNumber", headerName: "Week Number", width: 130 },
    {
      field: "createdAt",
      headerName: "Status",
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        {
          return params.field ? "Present" : "Absent";
        }
      },
    },
  ];
  const attendanceValidator = z.object({ weekNumber: z.number() });
  type attendanceType = z.infer<typeof attendanceValidator>;
  const form = useForm<attendanceType>({
    resolver: zodResolver(attendanceValidator),
    defaultValues: {
      weekNumber: 0,
    },
  });
  const attendanceMutation = useMutation({
    mutationFn: async (data: attendanceType) => {
      return await myAxios.post(`attendance/${id}`, { ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["attendance", id]);
      toast("Success");
    },
    onError: () => {
      toast("error");
    },
  });

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
            <div className="flex flex-row justify-between gap-10">
              <div style={{ height: 400, width: "100%" }}>
                {attendance && (
                  <DataGrid
                    rows={attendance}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                  />
                )}
              </div>
              {session?.user?.role === "TEACHER" && (
                <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={form.handleSubmit((values: attendanceType) => {
                    attendanceMutation.mutate(values);
                    form.reset();
                  })}
                >
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="weekNumber"
                    >
                      Week Number
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="weekNumber"
                      type="number"
                      placeholder="Week Number"
                      {...form.register("weekNumber", { valueAsNumber: true })}
                    />
                  </div>
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </form>
              )}
            </div>
          </TabPanel>
          <TabPanel value="3">Task data</TabPanel>
        </TabContext>
      </Box>
    </>
  );
  return component;
};
export default Profile;
