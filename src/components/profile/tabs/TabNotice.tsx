import { myAxios } from "@/lib/myaxios";
import { noticedetails, noticesSchema } from "@/schema/notice";
import { noticeType } from "@/types/notice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const TabNotice = ({ id }: {id:string}) => {
    const queryClient = useQueryClient()
  const { data: notices } = useQuery({
    queryFn: async () => {
      const res = await myAxios.get(`notice/${id}`);
      return noticesSchema.parse(res.data).reverse();
    },
    queryKey: ["notice", id],
    staleTime: 30000,
  });

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
        queryClient.invalidateQueries(["notice", id])
      toast("Success");
    },
    onError: () => {
      toast("error");
    },
  });

  return (
    <div className="flex flex-row justify-around gap-10">
      <div className="border-white border-2 w-1/2 text-slate-50 max-h-96 overflow-auto">
        {notices &&
          notices.map((notice, index) => {
            return (
              <div key={index} className="flex flex-col">
                  <div className="col-span-2">{notice.teacher.name} wrote, {'"'}{notice.details}{'"'}</div>
                <div className="text-sm text-slate-200">{notice.createdAt}</div>
                <hr/>
              </div>
            );
          })}
      </div>
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
                      className="w-full h-32 resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
           
            placeholder="Notice"
            {...form.register("details")}
          />
        </div>
        <Button className="hover:bg-slate-300" variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TabNotice;
