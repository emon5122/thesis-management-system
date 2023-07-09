"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react"
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isStudent, setIsStudent] = useState(true)
  return (
    <div>
      <section className="lg:h-screen flex justify-center">
        <div className="container w-full h-full flex justify-center">
          <div className="g-6 pl-px	 flex w-full h-full flex-wrap items-center justify-center dark:text-neutral-200">
            <div className="pl-0.5	rounded-lg flex justify-center shadow-lg bg-cyan-700			">
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
                        Please register an account
                      </h4>
                    </div>

                    <form>
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                          type="text"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput1"
                          placeholder=""
                        />
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Username
                        </label>
                      </div>

                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                             value={password}
                             onChange={e => setPassword(e.target.value)}
                          type="password"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="exampleFormControlInput11"
                          placeholder="Password"
                        />
                        <label
                          htmlFor="exampleFormControlInput11"
                          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                          Password
                        </label><br/>
                        
            <input onChange={() => setIsStudent(false)} className="m-2" type="radio" name="gender" value="male" id="male"/>
            Faculty
            <input onChange={() => setIsStudent(true)} className="m-2" type="radio" name="gender" value="female" id="female"/>
            Student
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button onClick={() => {
                            router.push("/");
                            signIn({username: username, password: password, isStudent: isStudent})
                            
                          }}
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.2),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Sign up
                        </button>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account?</p>
                        <button
                          onClick={() => {
                            router.push("/login");
                          }}
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h5 className="text-xl">
                      Welcome to a place where curiosity is nurtured, and
                      breakthroughs are celebrated.Let's push the boundaries of
                      knowledge and make a meaningful impact Happy researching!
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
};

export default Signup;
