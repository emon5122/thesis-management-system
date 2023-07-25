
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { myAxios } from '@/lib/myaxios';

  
const TabGrade = ({session,id}:any) => {
    
  const { data: grade } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get("evaluation");
      return value.data;
    },
    

    queryKey: ["grade"],
    staleTime: 300000,
  });
  console.log(grade?.itemCount)
  const { data: count } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get("thesis");
      return value.data;
    },
    

    queryKey: ["count"],
    staleTime: 300000,
  });
  console.log(count)
 const evaluatorCount = 3;
 if (evaluatorCount > 2) {
  
 }
 else {
  ""
 }
    return (
        <div className="h-full">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          
          title="Thesis Final Grade"
         
        />
        <CardMedia
          component="img"
          height="100"
          image="/grade.jpg"
          alt="Grade"
        />
        {count ===  grade?.itemCount ?
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            You have got : {grade?.totalGrade}
          </Typography>
        </CardContent> : <CardContent>
          <Typography variant="body2" color="text.secondary">
            You have got no grade yet
          </Typography>
        </CardContent>
}
        
      </Card>
      </div>
    );
}

export default TabGrade
