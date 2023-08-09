import SingleEvaluation from "@/components/evaluation";
import { myAxios } from "@/lib/myaxios";
import { useQuery } from "@tanstack/react-query";

const TabResult = ({ id }: any) => {
  const { data: evaluationList, isLoading: evalLoading } = useQuery({
    queryFn: async () => {
      const res = myAxios.get(`grade/${id}`);
      return (await res).data;
    },
    queryKey: ["grade", id],
    staleTime: 50000,
  });

  return (
    <div className="text-xl text-center mb-2 text-white">
      {!evalLoading &&
        (evaluationList.length ? (
          evaluationList.map((evaluation: any, index: number) => (
            <SingleEvaluation param={evaluation} key={index} />
          ))
        ) : (
          <p>Not submitted yet</p>
        ))}
    </div>
  );
};

export default TabResult;
