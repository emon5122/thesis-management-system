"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Box, Button, Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAxios } from "@/lib/myaxios";
import { z } from "zod";
import { thesisEvaluators } from "@/schema/thesis/adminThesis";
import { teacherFormBody } from "@/types/thesis";
import { toast } from "react-toastify";
import { DeleteIcon } from "lucide-react";

const Assign = () => {
    const queryClient = useQueryClient();
    type thesis = { id: number; value: string }[];
    const [thesisId, setThesisId] = useState<thesis>([{ id: 0, value: "" }]);
    const [teacherId, setTeacherId] = useState<string>("");
    const { control, register, handleSubmit, reset } = useForm<teacherFormBody>(
        {
            resolver: zodResolver(thesisEvaluators),
            defaultValues: {
                id: "",
                teachers: [
                    {
                        id: "",
                    },
                ],
            },
        }
    );
    const { fields, append, remove } = useFieldArray({
        name: "teachers",
        control,
        rules: {
            required: "Please append at least 1 item",
        },
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
    const { data: theses } = results[0];
    const { data: teachers } = results[1];

    const assignMutation = useMutation({
        mutationFn: async (data: teacherFormBody) => {
            await myAxios.patch(`/thesis/${data.id}`, [...data.teachers]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["theses", "teachers"]);
            toast("Success!");
        },
    });

    return (
        <div className="w-full max-w-xs ">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit((values: teacherFormBody) => {
                    console.log(values);
                    assignMutation.mutate(values);
                    reset();
                })}
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={teacherId}
                    label="Thesis Name"
                    {...register("id", {
                        required: "Student name is required",
                    })}
                    onChange={(e: SelectChangeEvent) => {
                        setTeacherId(e.target.value);
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
                <Button
                    sx={{
                        width: "100%",
                    }}
                    variant="contained"
                    onClick={() => {
                        append({ id: "" });
                    }}
                >
                    Add Another Teacher
                </Button>
                {fields?.map((field, index) => {
                    return (
                        <Box
                            key={field.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                columnGap: 2,
                                marginTop: 2,
                            }}
                        >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={thesisId[index]?.value}
                                label="Thesis Name"
                                {...register(`teachers.${index}.id`, {
                                    required: "Student name is required",
                                })}
                                onChange={(e: SelectChangeEvent) => {
                                    setThesisId((prevState) => [
                                        ...prevState,
                                        {
                                            id: prevState.length,
                                            value: e.target.value,
                                        },
                                    ]);
                                }}
                            >
                                {teachers &&
                                    teachers.map((teacher) => {
                                        return (
                                            <MenuItem
                                                key={teacher.id}
                                                value={teacher.id}
                                            >
                                                {teacher.name}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                            <DeleteIcon onClick={() => remove(index)} />
                        </Box>
                    );
                })}
                <Button variant="outlined" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};
export default Assign;
