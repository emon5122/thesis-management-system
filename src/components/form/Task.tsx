"use client"
import { myAxios } from "@/lib/myaxios";
import { taskdetails } from "@/schema/task";
import { taskType } from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@mui/material";


const TaskForm=({id}:{id:string})=>{
    const queryClient = useQueryClient();
    const form = useForm<taskType>({
        resolver: zodResolver(taskdetails),
        defaultValues: {
          name:"",
          details:"",
          
        },
      });
      const onSubmit = (values: taskType) => {
        taskMutation.mutate(values);
        form.reset();
      };
      const taskMutation = useMutation({
        mutationFn: async (data: taskType) => {
          return await myAxios.post(`task/${id}`, { ...data });
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["task", id]);
          toast("Success");
        },
        onError: () => {
          toast("error");
        },
      });
    return(
<form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={form.handleSubmit((values: taskType) => {
                    taskMutation.mutate(values);
                    form.reset();
                  })}
                >
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Task title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Task title"
                      {...form.register("name", {
                       
                      })}
                    />
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="details"
                    >
                      Task Details
                    </label>
                    <textarea 
                      className=" h-32 resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      
                      placeholder="Task details"
                      {...form.register("details", {
                       
                      })}/>
                    

                  </div>
                  <Button className="hover:bg-slate-300" variant="outlined" type="submit">
                    Submit
                  </Button>
                </form>
    )
}
export default TaskForm;