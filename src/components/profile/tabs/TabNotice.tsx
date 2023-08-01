import { myAxios } from "@/lib/myaxios";
import {  noticesSchema } from "@/schema/notice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NoticeForm from "@/components/form/notice";

const TabNotice = ({ id,session }: any) => {
    const queryClient = useQueryClient()
  const { data: notices } = useQuery({
    queryFn: async () => {
      const res = await myAxios.get(`notice/${id}`);
      return noticesSchema.parse(res.data).reverse();
    },
    queryKey: ["notice", id],
    staleTime: 30000,
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
      {session?.user?.role === "TEACHER" && <NoticeForm id={id} />}

      
    </div>
  );
};

export default TabNotice;
