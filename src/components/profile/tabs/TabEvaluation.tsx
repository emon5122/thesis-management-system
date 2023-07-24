import { useQuery } from "@tanstack/react-query";
import Evaluation from "../../form/Evaluation";
import { myAxios } from "@/lib/myaxios";
const TabEvaluation = ({ id }: any) => {
  

  return (
    <div>
      <Evaluation id={id} />
    </div>
  );
};

export default TabEvaluation;
