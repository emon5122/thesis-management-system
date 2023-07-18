import { myAxios } from "@/lib/myaxios";
import { noticedetails, noticesSchema } from "@/schema/notice";
import { noticeType } from "@/types/notice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const TabNotice = ({ id }: any) => {
  const { data: notices } = useQuery({
    queryFn: async () => {
      const res = await myAxios.get(`notice/${id}`);
      return noticesSchema.parse(res.data);
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
      toast("Success");
    },
    onError: () => {
      toast("error");
    },
  });

  return (
    <div>
      <div>
        {notices &&
          notices.map((notice, index) => {
            return (
              <div key={index} className="grid grid-cols-4 border-2 border-white">
                <div className="col-span-2 grid grid-3">
                  <div className="col-span-1">Sender: </div>
                  <div className="col-span-2">{notice.teacher.name}</div>
                </div>
                <div className="col-span-1 grid grid-3">
                  <div className="col-span-1">Details:</div>
                  <div className="col-span-2">{notice.details}</div>
                </div>
                <div className="col-span-1">{notice.createdAt}</div>
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
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Notice"
            {...form.register("details")}
          />
        </div>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TabNotice;
