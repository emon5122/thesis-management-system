"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAxios } from "@/lib/myaxios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";


const AttendanceForm=({id}:{id:string})=>{
    const queryClient=useQueryClient()
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
    return(
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
                      {...form.register("weekNumber", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <Button className="hover:bg-slate-300" variant="outlined" type="submit">
                    Submit
                  </Button>
                </form>
    )

}
export default AttendanceForm;