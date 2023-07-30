import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { myAxios } from "@/lib/myaxios";

const TabGrade = ({ session, id }: any) => {
  const { data: grade } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get("evaluation");
      return value.data;
    },

    queryKey: ["grade"],
    staleTime: 300000,
  });
  const { data: count } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get("teacher-count");
      return value.data;
    },

    queryKey: ["count"],
    staleTime: 300000,
  });
  const { data: evcount } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get("evaluation-count");
      return value.data;
    },

    queryKey: ["evcount"],
    staleTime: 300000,
  });
console.log(evcount?.evaluationCount)
console.log(count?.teacherCount+1)

  return (
    <div className="h-full">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title="Thesis Final Grade" />
        <CardMedia
          component="img"
          height="100"
          image="/grade.jpg"
          alt="Grade"
        />
        {evcount?.evaluationCount  !== undefined && count?.teacherCount !== undefined ? (
          evcount?.evaluationCount === count?.teacherCount+1  ? (
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                You have got : {grade?.totalGrade}
              </Typography>
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                You have got no grade yet
              </Typography>
            </CardContent>
          )
        ) : (
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Loading... 
            </Typography>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default TabGrade;

// getToken() = useSession().data.user
