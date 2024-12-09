"use client"
import * as React from 'react';
import { Box, Container, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import Image from "next/image";
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

const DiscountBanner = () => {
    return(      
          <><Container className='thirdGried' maxWidth="xl">
          <Box sx={{ flexGrow: 1, padding: 4, // Padding inside the container
           border: "1px solid #dddddd", // Border starts after padding
           boxSizing: "border-box", }} >
        
             
      {/* Left Column */}
      <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={12}>
      <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-3.jpg&w=1920&q=100" alt="Description of the image" width={1080} height={720}/>
        
      </Grid>

      {/* Right Columns */}
      
    </Grid>
       </Box>
         </Container></> 

    );
}
export {DiscountBanner};