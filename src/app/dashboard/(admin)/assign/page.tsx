"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Select } from "@mui/material";
import { MenuItem, InputLabel } from "@mui/material";
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
  const results = useQueries({
    queries: [
      {
        queryKey: ["students"],
        queryFn: async () => {
          const res = await myAxios.get("assignable-students");
          return z
            .array(
              z.object({
                name: z.string(),
                id: z.string().uuid(),
              })
            )
            .parse(res.data);
        },
      },
      {
        queryKey: ["teachers"],
        queryFn: async () => {
          const res = await myAxios.get("teachers");
          return z
            .array(
              z.object({
                name: z.string(),
                id: z.string().uuid(),
              })
            )
            .parse(res.data);
        },
      },
    ],
  });
  const { data: students } = results[0];
  const { data: teachers } = results[1];
  const assignMutation = useMutation({
    mutationFn: async (data: assignFormType) => {
      await myAxios.post("/thesis", { ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      toast("Success!");
    },
  });
  return (
    <div className="max-w-xs m-auto mt-5 ">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={form.handleSubmit((values: assignFormType) => {
          assignMutation.mutate(values);
          form.reset();
        })}
      >
        <div className="mb-2">
          <InputLabel id="demo-multiple-chip-label" className="text-black">
            Thesis Title
          </InputLabel>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Thesis title"
            {...form.register("name", {
              required: "name is required",
            })}
          />
        </div>
        <InputLabel id="demo-multiple-chip-label" className="text-black">
          Evaluators List
        </InputLabel>
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
        <InputLabel id="demo-multiple-chip-label" className="text-black">
          Student List
        </InputLabel>
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
          <Button
            className="mt-5 hover:bg-slate-300"
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Assign;
