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
  const getTheses = async () => {
    const res = await myAxios.get("theses");
   
    const validatedData = z
      .array(
        z.object({
          name: z.string(),
          id: z.string().uuid(),
          studentId: z.string().uuid(),
          teacher: z.array(
            z.object({ name: z.string(), id: z.string().uuid() })
          ),
        })
      )
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
      { queryKey: ["theses"], queryFn: getTheses },
      { queryKey: ["teachers"], queryFn: getTeachers },
    ],
  });
  const { data: theses } = results[0];
  const { data: teachers } = results[1];

  const assignMutation = useMutation({
    mutationFn: async (data: assignFormType) => {
      await myAxios.post("/thesis", { ...data });
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(["students"]);
      toast("Success!");
    },
  });

  return (
    <div className="w-full max-w-xs ">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        
        <Select
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
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stId}
          label="Thesis Name"
          {...form.register("studentId", {
            required: "Student name is required",
          })}
          onChange={(e: SelectChangeEvent) => {
            setStId(e.target.value);
          }}
        >
          {theses &&
            theses.map((thesis) => {
              return (
                <MenuItem key={thesis.id} value={thesis.id}>
                  {thesis.name}
                </MenuItem>
              );
            })}
        </Select>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default Assign;
