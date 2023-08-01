"use client";
import { myAxios } from "@/lib/myaxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { noticeType } from "@/types/notice";
import { noticedetails } from "@/schema/notice";

const NoticeForm = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const form = useForm<noticeType>({
    resolver: zodResolver(noticedetails),
    defaultValues: {
      details: "",
    },
  });
  const noticeMutation = useMutation({
    mutationFn: async (data: noticeType) => {
      return await myAxios.post(`notice/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notice", id]);
      toast("Success");
    },
    onError: () => {
      toast("error");
    },
  });
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={form.handleSubmit((values: noticeType) => {
        noticeMutation.mutate(values);
        form.reset();
      })}
    >
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Notice
        </label>
        <textarea
          className=" h-32 resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          placeholder="Notice"
          {...form.register("details")}
        />
      </div>
      <Button className="hover:bg-slate-300" variant="outlined" type="submit">
        Submit
      </Button>
    </form>
  );
};
export default NoticeForm;
