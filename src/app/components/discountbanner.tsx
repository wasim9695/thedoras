"use client";
import * as React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import Image from "next/image";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }));

const DiscountBanner = () => {
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
        <Grid container spacing={2}>
          {/* Banner Image with Hover Effect */}
          <Grid item xs={12}>
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
                src="https://sabyasachi.com/cdn/shop/files/Hero-01_7858bb31-290f-4fca-83b4-c14acec97ab9_1920x@2x.jpg?v=1721306155"
                alt="Discount Banner"
                width={1920}
                height={720}
                style={{
                  width: '100%',
                  height: 'auto',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              {/* Overlay with Title and Button */}
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
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                 BRIDAL COUTURE 2024
                </Typography>
                {/* <Typography
                  variant="h5"
                  sx={{ mt: 1, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  Limited Time Offer
                </Typography> */}
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { DiscountBanner };