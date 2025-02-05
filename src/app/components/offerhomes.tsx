"use client"
import * as React from 'react';
import { Box, Container, Link, Paper, Stack, Typography } from '@mui/material';
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

const OfferHomes = () => {
    return(      
          <><Container className='thirdGried' maxWidth="xl">
          <Box sx={{ flexGrow: 1, padding: 4, // Padding inside the container
           border: "1px solid #dddddd", // Border starts after padding
           boxSizing: "border-box", }} >
             <Typography className='headingProduct' variant="h4" fontWeight="bold">Flash Sale</Typography>
         {/* <Grid container spacing={2}>
         
         <Grid item xs={3}>
         
        <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
           <Grid item xs={3}>
         
        <Image  src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
          
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
           <Grid item xs={3}>
         
        <Image  src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
           
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
           <Grid item xs={3}>
         
        <Image  src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
           
           
           
           
         </Grid>
         <Grid container className='secongProductRow' spacing={2} sx={{ pt: 5 }}>
         
         <Grid item xs={3}>
         
        <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
           <Grid item xs={3}>
         
        <Image  src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
          
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
           <Grid item xs={3}>
         
        <Image  src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
           
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
           <Grid item xs={3}>
         
        <Image  src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
           
           
           
           
         </Grid> */}
         <Stack direction={{ xs: 'column', sm: 'row' }}
     spacing={{ xs: 1, sm: 2, md: 4 }}>
     <Item className='product-item'>
       <Link href="#" underline="none">
       <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
                   </Link>
                   </Item>
                   <Item className='product-item'>
       <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
                   <Item className='product-item'>
       
       <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
                   <Item className='product-item'>
       
       <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
                   
   </Stack>
   <Stack direction={{ xs: 'column', sm: 'row' }}
     spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ mt: 2 }}>
      <Item className='product-item'>
       
       <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
                    <Item className='product-item'>
                    <Link href="#" underline="none">
                    <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
                   </Link>
                   </Item>
                   <Item className='product-item'>
       <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
                   <Item className='product-item'>
       <Image className='' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720}/>
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
   </Stack>
       </Box>
         </Container></> 

    );
}
export {OfferHomes};