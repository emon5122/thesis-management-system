"use client";

import { loginValidator } from "@/schema/login";
import type { LoginValue } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputLabel, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<LoginValue>({ resolver: zodResolver(loginValidator) });
  const { data: session } = useQuery({
    queryFn: async () => {
      return await getSession();
    },
    queryKey: ["session"],
  });

  if (session) {
    router.push("/dashboard");
  }
  return (
    <div className="flex flex-col bg-slate-400 h-screen">
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

      <form className="flex flex-col border-2 border-dashed border-cyan-50 p-6 border-slate-400/60 rounded-md shadow-lg shadow-slate-500 gap-2 m-auto "
        onSubmit={form.handleSubmit(async (value) => {
          await signIn("credentials", value);
          queryClient.invalidateQueries(["session"]);
          form.reset();
        })}
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

        <div className="w-1/2 self-center justify-center flex ">
          <Button variant="outlined" type="submit">
            Log in
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-between  py-6 m-auto">
        <p className="mb-0 mr-2 text-white">{"Don't"} you have an account?</p>
        <Button variant="outlined" type="submit">
        <Link href={"/signup"}>
        Sign up
        </Link>
          </Button>
          
        
      </div>
    </div>
  );
}
