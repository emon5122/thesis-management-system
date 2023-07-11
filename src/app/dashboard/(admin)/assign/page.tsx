"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAxios } from "@/lib/myaxios";
import { z } from "zod";
import { thesisBody } from "@/schema/thesis/adminThesis";
import { assignFormType } from "@/types/thesis";
import { toast } from "react-toastify";
const Assign = () => {
  const queryClient = useQueryClient();
  const [stId, setStId] = useState<string>("");
  const [spId, setSpId] = useState<string>("");
  const form = useForm<assignFormType>({
    resolver: zodResolver(thesisBody),
    defaultValues: {
      name: "",
      studentId: "",
      supervisorId: "",
    },
  });
  const onSubmit = (values: assignFormType) => {
    assignMutation.mutate(values);
    form.reset();
  };
  const getStudents = async () => {
    const res = await myAxios.get("assignable-students");
    const validatedData = z
      .array(z.object({ name: z.string(), id: z.string().uuid() }))
      .parse(res.data);
    return validatedData;
  };
  const getTeachers = async () => {
    const res = await myAxios.get("teachers");
    const validatedData = z
      .array(z.object({ name: z.string(), id: z.string().uuid() }))
      .parse(res.data);
    return validatedData;
  };
  const results = useQueries({
    queries: [
      { queryKey: ["students"], queryFn: getStudents },
      { queryKey: ["teachers"], queryFn: getTeachers },
    ],
  });
  const { data: students } = results[0];
  const { data: teachers } = results[1];

  const assignMutation = useMutation({
    mutationFn: async (data: assignFormType) => {
      await myAxios.patch(`/thesis/${data.id}`, { ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      toast("Success!");
    },
  });

  return (
    <div className="w-full max-w-xs ml-72 mt-5 ">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Thesis title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Thesis title"
            {...form.register("name", { required: "name is required" })}
          />
        </div>

        <Select
          className=" text-black mx-20"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={spId}
          label="Supervisor Name"
          {...form.register("supervisorId", {
            required: "Supervisor name is required",
          })}
          onChange={(e: SelectChangeEvent) => {
            setSpId(e.target.value);
          }}
        >
          {teachers &&
            teachers.map((teacher) => {
              return (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </MenuItem>
              );
            })}
        </Select>

        <Select
          className=" mx-20 text-black"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stId}
          label="Student Name"
          {...form.register("studentId", {
            required: "Student name is required",
          })}
          onChange={(e: SelectChangeEvent) => {
            setStId(e.target.value);
          }}
        >
          {students &&
            students.map((student) => {
              return (
                <MenuItem key={student.id} value={student.id}>
                  {student.name}
                </MenuItem>
              );
            })}
        </Select>
        <br />
        <div className="mx-20">
          <Button className="mt-2 " variant="outlined" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Assign;
