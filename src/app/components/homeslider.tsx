"use client";
import * as React from 'react';
import { Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import Image from "next/image";
import { keyframes } from '@mui/system';
import {HomeSwiperMain} from '../components';
const imgss1 = '/imgs2.jpg';

// Define keyframe animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomeSlider = () => {
    return (
        <>
            <CssBaseline />
            <Container
                maxWidth="xl"
                sx={{
                    mt: 0.3,
                    fontFamily: 'Roboto, sans-serif', // Adding the Google Font
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={7} sx={{ animation: `${fadeIn} 1s ease-out` }}>
                            <Image
                                src="https://sakshigirri.com/cdn/shop/files/HERO_BANNER_aaa759d2-4b9a-4511-bc90-0f5e64488ee2_720x.jpg?v=1679728081"
                                alt="Description of the image"
                                width={1080}
                                height={420}
                            />
                            <Box
                            sx={{
                                position: "absolute",
                                top: "70%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "white",
                                textAlign: "center",
                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                p: 2,
                                borderRadius: 2,
                                maxWidth: "90%"
                            }}
                            // Prevent overlapping
                            >
                                <Typography variant="h4" fontWeight="bold" mb={1}>
                                    New Collection
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    Discover our latest fashion arrivals
                                </Typography>
                                <Button variant="contained" style={{background:'#ba9e75'}}>
                                    Shop Now
                                </Button>
                                </Box>
                        </Grid>
                        <Grid item xs={2.5} sx={{ animation: `${fadeIn} 1s ease-out 0.5s` }}>
                            <Image
                                className="secondImg"
                                src="https://sakshigirri.com/cdn/shop/files/preview_images/cd8da969291f4aadbc2f51c4e0231233.thumbnail.0000000000_360x.jpg?v=1714636716"
                                alt="Description of the image"
                                width={1080}
                                height={420}
                                style={{height:"92%"}}
                            />
                            <Box
                            sx={{
                                position: "absolute",
                                top: "70%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "white",
                                textAlign: "center",
                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                p: 2,
                                borderRadius: 2,
                                maxWidth: "90%"
                            }}
                            // Prevent overlapping
                            >
                                <Typography variant="h4" fontWeight="bold" mb={1}>
                                    New Collection
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    Discover our latest fashion arrivals
                                </Typography>
                                <Button variant="contained" style={{background:'#ba9e75'}}>
                                    Shop Now
                                </Button>
                                </Box>
                        </Grid>
                        <Grid item xs={2.5} sx={{ animation: `${fadeIn} 1s ease-out 1s` }}>
                            <Image
                                className="secondImg"
                                src="https://sakshigirri.com/cdn/shop/files/preview_images/cd8da969291f4aadbc2f51c4e0231233.thumbnail.0000000000_360x.jpg?v=1714636716"
                                alt="Description of the image"
                                width={1080}
                                height={720}
                                style={{height:"92%"}}
                            />
                            <Box
                            sx={{
                                position: "absolute",
                                top: "70%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "white",
                                textAlign: "center",
                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                p: 2,
                                borderRadius: 2,
                                maxWidth: "90%"
                            }}
                            // Prevent overlapping
                            >
                                <Typography variant="h4" fontWeight="bold" mb={1}>
                                    New Collection
                                </Typography>
                                <Typography variant="body1" mb={2}>
                                    Discover our latest fashion arrivals
                                </Typography>
                                <Button variant="contained" style={{background:'#ba9e75'}}>
                                    Shop Now
                                </Button>
                                </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <HomeSwiperMain/>

            <Container className="secondGried" maxWidth="xl" sx={{ mb: 5 }}>
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={3} sx={{ animation: `${fadeIn} 1s ease-out 0.5s`, position: 'relative' }}>
                <Image
                    className="secondImg"
                    src={imgss1}
                    alt="Description of the image"
                    width={1080}
                    height={720}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                                    UP TO 20% OFF
                                  </Box>
                                  <Box sx={{ fontSize: "1.2rem" }}>FOR ALL WOMEN CLOTHING</Box>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      mt: 2,
                                      backgroundColor: "black", // Changed to black background
                                      color: "white", // Changed to white text
                                      "&:hover": {
                                        backgroundColor: "#333", // Darker black for hover effect
                                      },
                                    }}
                                  >
                                    EXPLORE  NOW
                                  </Button>
                </Box>
            </Grid>
            <Grid item xs={3} sx={{ animation: `${fadeIn} 1s ease-out 1s`, position: 'relative' }}>
                <Image
                    className="secondImg"
                    src={imgss1}
                    alt="Description of the image"
                    width={1080}
                    height={720}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                                    UP TO 20% OFF
                                  </Box>
                                  <Box sx={{ fontSize: "1.2rem" }}>FOR ALL WOMENS CLOTHING</Box>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      mt: 2,
                                      backgroundColor: "black", // Changed to black background
                                      color: "white", // Changed to white text
                                      "&:hover": {
                                        backgroundColor: "#333", // Darker black for hover effect
                                      },
                                    }}
                                  >
                                    EXPLORE NOW
                                  </Button>
                </Box>
            </Grid>
            <Grid item xs={6} sx={{ animation: `${fadeIn} 1s ease-out 1.5s`, position: 'relative' }}>
                <Image
                    src="https://sakshigirri.com/cdn/shop/files/HERO_BANNER_aaa759d2-4b9a-4511-bc90-0f5e64488ee2_720x.jpg?v=1679728081"
                    alt="Description of the image"
                    width={1080}
                    height={720}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'white',
                    }}
                >
                    <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                                    UP TO 30% OFF
                                  </Box>
                                  <Box sx={{ fontSize: "1.2rem" }}>FEATURE COLLECTION</Box>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      mt: 2,
                                      backgroundColor: "black", // Changed to black background
                                      color: "white", // Changed to white text
                                      "&:hover": {
                                        backgroundColor: "#333", // Darker black for hover effect
                                      },
                                    }}
                                  >
                                    EXPLORE NOW
                                  </Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
</Container>

        </>
    );
}

export { HomeSlider };
