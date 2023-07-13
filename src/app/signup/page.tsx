"use client";

import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationType } from "@/types/register";
import { register } from "@/schema/registration";
import { useMutation } from "@tanstack/react-query";
import { myAxios } from "@/lib/myaxios";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import type { Session } from "next-auth";

const Signup = () => {
  const [user, setUser] = useState<Session | null>();
  getSession().then((res) => {
    setUser(res);
  });
  const router = useRouter();

  const [userRole, setUserRole] = useState("");

  const form = useForm<registrationType>({
    resolver: zodResolver(register),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
  });
  const onSubmit = (values: registrationType) => {
    signUpMutation.mutate(values);
    form.reset();
  };
  const signUpMutation = useMutation({
    mutationFn: async (data: registrationType) => {
      await myAxios.post("/registration", { ...data });
    },
    onSuccess: () => {
      signIn("Credentials");
    },
  });

  if (!user?.user?.email) {
    return (
      <div className="flex flex-col bg-slate-400">
        <Image
          className="mx-auto w-48"
          src="/draw.webp"
          alt="logo"
          width={"200"}
          height={"200"}
        />

        <h4 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold flex justify-center self-center">
          Please register an account
        </h4>

        <form
          className="flex flex-col border-2 border-dashed border-cyan-50 p-6 border-slate-400/60 rounded-md shadow-lg shadow-slate-500 gap-2 m-auto "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-4 ">
            <div className="flex justify-center items-center">
              <InputLabel
                style={{
                  color: "rgb(229,229,229)",
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                }}
                id="demo-simple-select-helper-label"
              >
                Full Name
              </InputLabel>
            </div>
            <div className="col-span-3">
              <TextField
                style={{
                  color: "rgb(229,229,229)",
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                }}
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                type="text"
                placeholder="Alan Joe."
                {...form.register("name")}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 ">
            <div className="flex justify-center items-center">
              <InputLabel
                style={{
                  color: "rgb(229,229,229)",
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                }}
                id="demo-simple-select-helper-label"
              >
                Email
              </InputLabel>
            </div>
            <div className="col-span-3">
              <TextField
                style={{
                  color: "rgb(229,229,229)",
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                }}
                id="outlined-basic"
                label="email"
                variant="outlined"
                type="email"
                placeholder=""
                {...form.register("email")}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 ">
            <div className="flex justify-center items-center">
              <InputLabel
                style={{
                  color: "rgb(229,229,229)",
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                }}
                id="demo-simple-select-helper-label"
              >
                Password
              </InputLabel>
            </div>
            <div className="col-span-3">
              <TextField
                style={{
                  color: "rgb(229,229,229)",
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                }}
                id="outlined-basic"
                label="password"
                variant="outlined"
                type="password"
                placeholder="xxxxx"
                {...form.register("password")}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 ">
            <div className="flex justify-center items-center">
              <InputLabel
                style={{
                  color: "rgb(229,229,229)",
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                }}
                id="demo-simple-select-helper-label"
              >
                Role
              </InputLabel>
            </div>
            <div className="col-span-3">
              <Select
                style={{
                  height: "50px",
                  width: "223px",
                  color: "rgb(229,229,229)",
                  fontSize: "0.9rem",
                  lineHeight: "1.25rem",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userRole}
                label="Role"
                {...form.register("role", {
                  required: "Role is required",
                })}
                onChange={(e: SelectChangeEvent) => {
                  setUserRole(e.target.value);
                }}
              >
                <MenuItem value="STUDENT">STUDENT</MenuItem>
                <MenuItem value="TEACHER">TEACHER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </div>
          </div>
          <div className="w-1/2 self-center justify-center flex ">
            <Button variant="outlined" type="submit">
              Sign up
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-between  py-6 m-auto">
          <p className="mb-0 mr-2 text-white">Have an account?</p>
          <button
            onClick={() => {
              router.push("/login");
            }}
            type="button"
            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs text-white font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Log in
          </button>
        </div>
      </div>
      
    );
  } else {
    redirect("/dashboard");
  }
};

export default Signup;