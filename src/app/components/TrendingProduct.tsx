"use client";
import * as React from 'react';
import { Box, Container, Grid, Typography, Button, Paper, styled } from '@mui/material';
import Image from "next/image";
import {fetchFeatured} from '../api/bannerAll/banners';
import { useEffect, useState } from "react";
import Link from "next/link"; // Added for linking to pathUrl

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

const fp = '/f01.jpg'; // Replace with your actual image path

const TrendingProduct = () => {

  const [getFeatured, setFeatured] = useState<any[]>([]);

  const getFeatureAllData = async () => {
    try {
      const bannerData = await fetchFeatured();
      if (bannerData.data && bannerData.data.length > 0) {
        setFeatured(bannerData.data);
      }
    } catch (err) {
      // Optionally handle error
    }
  };
  
    useEffect(() => {
      getFeatureAllData();
    }, []);



  return (
    <Container className="thirdGried" maxWidth="xl">
      <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          border: "1px solid #dddddd",
          boxSizing: "border-box",
        }}
      >
        <Typography className="headingProduct" variant="h4" fontWeight="bold">
          Fresh Arrival
        </Typography>

        {/* Tri-panel Layout */}
        <Grid container spacing={0} sx={{ mt: 2 }}>
          {/* Left Panel: Red background with text overlay and floral */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                position: 'relative',
                height: 600, // Adjust height as needed
                backgroundColor: '#33332f', // Dark red
                overflow: 'hidden',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: 2,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url(/path-to-floral-pattern.png)', // Replace with actual floral image or generate SVG
                  backgroundSize: 'cover',
                  opacity: 0.3,
                },
              }}
            >
              <Typography 
                variant="h2" 
                fontWeight="bold" 
                sx={{ 
                  zIndex: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                FLUID
              </Typography>
              <Typography 
                variant="h2" 
                fontWeight="bold" 
                sx={{ 
                  zIndex: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 2,
                }}
              >
                FORMS
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  zIndex: 1,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                SHOP CO-ORDS
              </Typography>
              {/* Optional Help? button or link */}
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  zIndex: 1,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Help?
              </Button>
            </Box>
          </Grid>

          {/* Middle Panel: Green background with model image */}
          {getFeatured.slice(0, 1).map((product: any, index: any) => (
            <Grid item xs={12} sm={4} key={`middle-${index}`}>
              <Box
                sx={{
                  position: 'relative',
                  height: 600,
                  backgroundColor: '#006400', // Dark green
                  overflow: 'hidden',
                  borderRadius: 4,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={product.imageUrl} // Assume first item is the middle model image
                  alt="Model in orange outfit"
                  width={1080}
                  height={720}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                {/* Optional Overlay for hover */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {product.heading}
                  </Typography>
                  <Link
                    href={`/shop/${product.pathUrl}/${product.categoriesId}`}
                    passHref
                    legacyBehavior
                  >
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#333',
                        },
                      }}
                    >
                      Shop Now
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}

          {/* Right Panel: Red background with model image */}
          {getFeatured.slice(1, 2).map((product: any, index: any) => (
            <Grid item xs={12} sm={4} key={`right-${index}`}>
              <Box
                sx={{
                  position: 'relative',
                  height: 600,
                  backgroundColor: '#DC143C', // Crimson red
                  overflow: 'hidden',
                  borderRadius: 4,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={product.imageUrl} // Assume second item is the right model image
                  alt="Model in purple outfit"
                  width={1080}
                  height={720}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                {/* Optional Overlay for hover */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                >
                  <Typography variant="h5" fontWeight="bold">
                    {product.heading}
                  </Typography>
                  <Link
                    href={`/shop/${product.pathUrl}/${product.categoriesId}`}
                    passHref
                    legacyBehavior
                  >
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#333',
                        },
                      }}
                    >
                      Shop Now
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Optional: Retain original grid below if needed, or remove */}
        {/* <Grid container spacing={2}>
          ...
        </Grid> */}
      </Box>
    </Container>
  );
};

export { TrendingProduct };