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

const FeaturedProduct = () => {

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
          Featured Products
        </Typography>

        {/* Left Column */}
        <Grid container spacing={2}>
          {/* Left Column */}
           {getFeatured.slice(0, 1).map((product: any, index: any) => (
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                '&:hover img': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Image
                src={product.imageUrl}
                alt="Description of the image"
                width={1080}
                height={720}
                style={{
                  width: '100%',
                  height: 'auto',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
             {product.heading}
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575', marginBottom: 1 }}>
              {product.subheading}
            </Typography>
            <Typography variant="h6" sx={{ color: '#ff5722', fontWeight: 'bold' }}>
              ${product.banner_price}
            </Typography>
          </Grid>

                 ))}
          {/* Right Columns */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {getFeatured.slice(1, 5).map((product: any, index: any) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Item>
                    <Box
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 4,
                        '&:hover img': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <Image
                        src={product.imageUrl}
                        alt="Description of the image"
                        width={1080}
                        height={720}
                        style={{
                          width: '100%',
                          height: 'auto',
                          transition: 'transform 0.3s ease-in-out',
                        }}
                      />
                  
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                        <Typography variant="h6" fontWeight="bold">
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
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                     {product.heading}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', marginBottom: 1 }}>
                      {product.subheading}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#ff5722', fontWeight: 'bold' }}>
                      ${product.banner_price}
                    </Typography>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { FeaturedProduct };