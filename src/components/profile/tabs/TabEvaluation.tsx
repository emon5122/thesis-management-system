"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { myAxios } from "@/lib/myaxios";
import { toast } from "react-toastify";
import EvaluationValidator from "@/schema/evaluation";
import SingleEvaluation from "@/components/evaluation";

const TabEvaluation = ({ id }: any) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const res = await myAxios.get(`is-evaluatable/${id}`);
      return res.data?.details;
    },
    queryKey: ["is-evaluatable", id],
    staleTime: 300000,
  });
  const queryClient = useQueryClient();

  const { data: list } = useQuery({
    queryFn: async () => {
      const res = await myAxios.get(`single-evaluation/${id}`);
      return res.data;
    },
    queryKey: ["single-evaluation", id],
    staleTime: 50000,
  });
const {data: evaluationList,isLoading:evalLoading,isError:evalError}=useQuery({
  queryFn:async()=>{
    const res = myAxios.get(`grade/${id}`)
    return (await res).data
  },queryKey:["grade", id],
  staleTime:50000
})
  type evaluationType = z.infer<typeof EvaluationValidator>;
  const form = useForm<evaluationType>({
    resolver: zodResolver(EvaluationValidator),
    defaultValues: {
      m1: 0,
      m2: 0,
      m3: 0,
      m4: 0,
      m5: 0,
      m6: 0,
      comment: "",
    },
  });

  const evaluationMutation = useMutation({
    mutationFn: async (data: evaluationType) => {
      return await myAxios.post(`evaluation/${id}`, { ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["evaluation", id]);
      queryClient.invalidateQueries(["is-evaluatable", id]);
      toast("Success");
    },
    onError: () => {
      toast("error");
    },
  });
if(evalError) throw new Error()
  if (!isLoading && !isError) {
    return (
      <div>
          
        {!data ? (
          <div className="text-xl text-center mb-2 text-white">
            <p>You have already submitted!</p>
            {}
            {!evalLoading&& evaluationList.length && evaluationList.map((evaluation:any,index:number)=>{
          return(<SingleEvaluation param={evaluation} key={index}/>)
        })}
            
          </div>
        ) : (
          <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-justify border-slate-500 border-2"
          onSubmit={form.handleSubmit((values: evaluationType) => {
            evaluationMutation.mutate(values);

            form.reset();
          })}
        >
          <div className="grid grid-cols-6 ">
            <div className="mb-2  col-span-4 ">
              <div className="grid grid-cols-4  ">
                <div className="mb-2 col-span-3 ">
                  <label
                    className="block text-black text-sm  mb-2"
                    htmlFor="name"
                  >
                    Demonstrate sound background knowledge and in-depth analysis
                    of problem domain after exsaustive study of research
                    literature. (PO1-PO2-PO12) (15%)
                  </label>
                </div>
                <div className="m-2 col-span-1   ">
                  {!isLoading && !isError && data ? (
                    <input
                      className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="number"
                      {...form.register("m1", {
                        valueAsNumber: true,
                      })}
                    />
                  ) : (
                    <p className="text-center">{list?.m1}</p>
                  )}
                  <span className="text-red-500">
                    {form.formState.errors.m1 &&
                      form.formState.errors.m1.message}
                  </span>
                </div>
              </div>

              <hr className="border-slate-500 border-1" />
              <div className="grid grid-cols-4 ">
                <div className="mb-2 col-span-3 ">
                  <label
                    className="block text-black text-sm  mb-2"
                    htmlFor="name"
                  >
                    Appropriate solution approach (designing methods) and own
                    contributions. (PO3) (20%)
                  </label>
                </div>
                <div className="m-2 col-span-1">
                  {!isLoading && !isError && data ? (
                    <input
                      className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="number"
                      {...form.register("m2", {
                        valueAsNumber: true,
                      })}
                    />
                  ) : (
                    <p className="text-center">{list?.m2}</p>
                  )}
                  <span className="text-red-500">
                    {form.formState.errors.m2 &&
                      form.formState.errors.m2.message}
                  </span>
                </div>
              </div>
              <hr className="border-slate-500 border-1" />
              <div className="grid grid-cols-4 ">
                <div className="mb-2 col-span-3 ">
                  <label
                    className="block text-black text-sm  mb-2"
                    htmlFor="name"
                  >
                    Conduct proper investigation through experiment and analysis
                    of data to arrive at valid conclusions. (PO4) (25%)
                  </label>
                </div>
                <div className="m-2 col-span-1 ">
                  {!isLoading && !isError && data ? (
                    <input
                      className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="number"
                      {...form.register("m3", {
                        valueAsNumber: true,
                      })}
                    />
                  ) : (
                    <p className="text-center">{list?.m3}</p>
                  )}
                  <span className="text-red-500">
                    {form.formState.errors.m3 &&
                      form.formState.errors.m3.message}
                  </span>
                </div>
              </div>
              <hr className="border-slate-500 border-1 " />
              <div className="grid grid-cols-4 ">
                <div className="mb-2 col-span-3 ">
                  <label
                    className="block text-black text-sm  mb-2"
                    htmlFor="name"
                  >
                    Choose appropriate/modern tools or software for experiment
                    of analysis. (PO5) (10%)
                  </label>
                </div>
                <div className="m-2 col-span-1 ">
                  {!isLoading && !isError && data ? (
                    <input
                      className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="number"
                      {...form.register("m4", {
                        valueAsNumber: true,
                      })}
                    />
                  ) : (
                    <p className="text-center">{list?.m4}</p>
                  )}
                  <span className="text-red-500">
                    {form.formState.errors.m4 &&
                      form.formState.errors.m4.message}
                  </span>
                </div>
              </div>
              <hr className="border-slate-500 border-1" />
              <div className="grid grid-cols-4 ">
                <div className="mb-2 col-span-3">
                  <label
                    className="block text-black text-sm  mb-2"
                    htmlFor="name"
                  >
                    Give clear and logical oral presentation and present written
                    final report (PO10) (20%)
                  </label>
                </div>
                <div className="m-2 col-span-1 ">
                  {!isLoading && !isError && data ? (
                    <input
                      className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="number"
                      {...form.register("m5", {
                        valueAsNumber: true,
                      })}
                    />
                  ) : (
                    <p className="text-center">{list?.m5}</p>
                  )}
                  <span className="text-red-500">
                    {form.formState.errors.m5 &&
                      form.formState.errors.m5.message}
                  </span>
                </div>
              </div>
              <hr className="border-slate-500 border-1" />
              <div className="grid grid-cols-4 ">
                <div className="mb-2 col-span-3">
                  <label
                    className="block text-black text-sm  mb-2"
                    htmlFor="name"
                  >
                    Work has an impact on society and some vision or awareness
                    for environment and sustainability. (PO6-PO7-PO8) (10%)
                  </label>
                </div>

                <div className="m-2 col-span-1 ">
                  {!isLoading && !isError && data ? (
                    <input
                      className="  border rounded border-blue-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="number"
                      {...form.register("m6", {
                        valueAsNumber: true,
                      })}
                    />
                  ) : (
                    <p className="text-center">{list?.m6}</p>
                  )}
                  <span className="text-red-500">
                    {form.formState.errors.m6 &&
                      form.formState.errors.m6.message}
                  </span>
                </div>
              </div>
              <hr className="border-slate-500 border-1 " />
            </div>

            <div className="mb-2 ml-2 col-span-2 border-slate-500 border-2">
              {!isLoading && !isError && data ? (
                <textarea
                  className=" h-full resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  placeholder="No score will be awarded if there is insufficient evidence of student performance.Add your comments here."
                  {...form.register("comment")}
                />
              ) : (
                <p className="text-justify m-2">{list?.comment}</p>
              )}

              <span className="text-red-500">
                {form.formState.errors.comment &&
                  form.formState.errors.comment.message}
              </span>
            </div>
            {!isLoading && !isError && data ? (
              <div className="  col-span-6 m-auto">
                <Button
                  className=" hover:bg-slate-300 "
                  variant="outlined"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
        )}
       
        
     
      </div>
    );
  }

  return <div className="text-white">Loading...</div>;
};

export default TabEvaluation;
