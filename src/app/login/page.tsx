"use client";

import { loginValidator } from "@/schema/login";
import type { LoginValue } from "@/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
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
        <div>
            <section className="lg:h-screen flex justify-center">
                <div className="container w-full h-full flex justify-center">
                    <div className="g-6 pl-px	 flex w-full h-full flex-wrap items-center justify-center dark:text-neutral-200">
                        <div className="pl-0.5	rounded-lg flex justify-center shadow-lg bg-cyan-700">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            <Image
                                                className="mx-auto w-48"
                                                src="/draw.webp"
                                                alt="logo"
                                                width={"200"}
                                                height={"200"}
                                            />
                                            <br></br>
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                Welcome back!
                                            </h4>
                                        </div>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                async (value) => {
                                                    await signIn(
                                                        "credentials",
                                                        value
                                                    );
                                                    queryClient.invalidateQueries(
                                                        ["session"]
                                                    );
                                                    form.reset();
                                                }
                                            )}
                                        >
                                            <div
                                                className="relative mb-4"
                                                data-te-input-wrapper-init
                                            >
                                                <input
                                                    type="email"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    placeholder="abc@xyz.com"
                                                    {...form.register("email")}
                                                />
                                                <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                                                    Email
                                                </label>
                                            </div>
                                            <div
                                                className="relative mb-4"
                                                data-te-input-wrapper-init
                                            >
                                                <input
                                                    type="password"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    placeholder="Password"
                                                    {...form.register(
                                                        "password"
                                                    )}
                                                />
                                                <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <Button
                                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.2),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                    type="submit"
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light"
                                                >
                                                    Log in
                                                </Button>
                                            </div>
                                        </form>
                                        <div className="flex items-center justify-between pb-6">
                                            <p className="mb-0 mr-2">
                                                {"Don't"} you have an account?
                                            </p>
                                            <Button
                                                type="button"
                                                className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                            >
                                                <Link href={"/signup"}>
                                                    Sign up
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h5 className="text-xl">
                                            Welcome to a place where curiosity
                                            is nurtured, and breakthroughs are
                                            celebrated. {"Let's"} push the
                                            boundaries of knowledge and make a
                                            meaningful impact Happy researching!
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
