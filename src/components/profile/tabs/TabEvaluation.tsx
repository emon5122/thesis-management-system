import { useQuery } from "@tanstack/react-query";
import Evaluation from "../../form/Evaluation";
import { myAxios } from "@/lib/myaxios";
const TabEvaluation = ({ id }: any) => {
  const { data: list } = useQuery({
    queryFn: async () => {
      const res = await myAxios.get(`evaluation/${id}`);
      return res.data;
    },
    queryKey: ["evaluation", id],
    staleTime: 50000,
  });
  console.log(list);
  return (
    <div>
      <Evaluation id={id} />
    </div>
  );
};

export default TabEvaluation;
