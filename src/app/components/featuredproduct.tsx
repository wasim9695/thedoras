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

const FeaturedProduct = () => {
    return(      
          <><Container className='thirdGried' maxWidth="xl">
          <Box sx={{ flexGrow: 1, padding: 4, // Padding inside the container
           border: "1px solid #dddddd", // Border starts after padding
           boxSizing: "border-box", }} >
             <Typography className='headingProduct' variant="h3">Featured Products</Typography>
             
      {/* Left Column */}
      <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={6}>
      <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Ffeatured%2F1.png&w=640&q=75" alt="Description of the image" width={1080} height={720}/>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                     Product Title 
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{ color: '#757575', marginBottom: 1 }}
                   >
                     Short description of the product goes here.
                   </Typography>
                   <Typography
                     variant="h6"
                     sx={{ color: '#ff5722', fontWeight: 'bold' }}
                   >
                     $99.99
                   </Typography>
      </Grid>

      {/* Right Columns */}
      <Grid item xs={6}>
        <Grid container spacing={2}>
          {/* First Group of 2 Columns */}
          <Grid item xs={6}>
            <Item><Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                     Product Title 
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{ color: '#757575', marginBottom: 1 }}
                   >
                     Short description of the product goes here.
                   </Typography>
                   <Typography
                     variant="h6"
                     sx={{ color: '#ff5722', fontWeight: 'bold' }}
                   >
                     $99.99
                   </Typography></Item>
          </Grid>
          <Grid item xs={6}>
            <Item><Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                     Product Title 
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{ color: '#757575', marginBottom: 1 }}
                   >
                     Short description of the product goes here.
                   </Typography>
                   <Typography
                     variant="h6"
                     sx={{ color: '#ff5722', fontWeight: 'bold' }}
                   >
                     $99.99
                   </Typography></Item>
          </Grid>

          {/* Second Group of 2 Columns */}
          <Grid item xs={6}>
            <Item><Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                     Product Title 
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{ color: '#757575', marginBottom: 1 }}
                   >
                     Short description of the product goes here.
                   </Typography>
                   <Typography
                     variant="h6"
                     sx={{ color: '#ff5722', fontWeight: 'bold' }}
                   >
                     $99.99
                   </Typography></Item>
          </Grid>
          <Grid item xs={6}>
            <Item><Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                     Product Title 
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{ color: '#757575', marginBottom: 1 }}
                   >
                     Short description of the product goes here.
                   </Typography>
                   <Typography
                     variant="h6"
                     sx={{ color: '#ff5722', fontWeight: 'bold' }}
                   >
                     $99.99
                   </Typography></Item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
       </Box>
         </Container></> 

    );
}
export {FeaturedProduct};