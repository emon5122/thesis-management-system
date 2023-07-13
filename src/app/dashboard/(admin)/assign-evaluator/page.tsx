"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Chip,
    InputLabel,
    OutlinedInput,
    Select,
} from "@mui/material";
import { MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAxios } from "@/lib/myaxios";
import { z } from "zod";
import { evaluatorsList, thesisEvaluators } from "@/schema/thesis/adminThesis";
import { teacherFormBody } from "@/types/thesis";
import { toast } from "react-toastify";

const Assign = () => {
    const queryClient = useQueryClient();
    const [thesisId, setThesisId] = useState<string>("");
    const [teachers, setTeachers] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<teacherFormBody>({
        resolver: zodResolver(thesisEvaluators),
    });

    const results = useQueries({
        queries: [
            {
                queryKey: ["theses"],
                queryFn: async () => {
                    const res = await myAxios.get("theses");
                    return z
                        .array(
                            z.object({
                                name: z.string(),
                                id: z.string().uuid(),
                                studentId: z.string().uuid(),
                                teacher: z.array(
                                    z.object({
                                        name: z.string(),
                                        id: z.string().uuid(),
                                    })
                                ),
                            })
                        )
                        .parse(res.data);
                },
            },
            {
                queryKey: ["teachers"],
                queryFn: async () => {
                    const res = await myAxios.get("teachers");
                    return evaluatorsList.parse(res.data);
                },
            },
        ],
    });
    const { data: theses } = results[0];
    const { data: teachersData } = results[1];

    const assignMutation = useMutation({
        mutationFn: async (data: teacherFormBody) => {
            console.log(data);
            return await myAxios.patch(`/thesis/${data.id}`, [
                ...data.teachers,
            ]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["theses", "teachers"]);
            toast("Success!");
        },
    });
    const handleChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setTeachers(typeof value === "string" ? value.split(",") : value);
    };
    console.log(errors);
    return (
        <div className="w-full max-w-xs ">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit((values: teacherFormBody) => {
                    assignMutation.mutate(values);
                    reset();
                })}
            >
                <div>{errors.id?.message}</div>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={thesisId}
                    label="Thesis Name"
                    {...register("id", {
                        required: "Student name is required",
                    })}
                    onChange={(e: SelectChangeEvent) => {
                        setThesisId(e.target.value);
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
                <div>{errors.root?.message}</div>
                <InputLabel id="demo-multiple-chip-label">
                    Evaluators List
                </InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    {...register("teachers", {
                        required: "Atleast one teacher is required",
                    })}
                    multiple
                    value={teachers as any}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected: any) => (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {selected.map((value: any) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {teachersData &&
                        teachersData.map((teacher) => (
                            <MenuItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </MenuItem>
                        ))}
                </Select>
                <div className="text-3xl">{errors.teachers?.message}</div>
                <Button variant="outlined" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};
export default Assign;
