
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

  
const TabGrade = ({session,id}:any) => {
    
  
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
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            You have got : A
          </Typography>
        </CardContent>
        
        
      </Card>
      </div>
    );
}

export default TabGrade
