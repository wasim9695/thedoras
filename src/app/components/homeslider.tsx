"use client"
import * as React from 'react';
import { Box, Container, CssBaseline, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import Image from "next/image";

const HomeSlider = () => {
    return(
           <><Container maxWidth="xl" sx={{ mt: 0 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Image src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-1.jpg&w=1080&q=100" alt="Description of the image" width={1080} height={720} />
                    </Grid>
                    <Grid item xs={2.5}>
                        <Image className='secondImg' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720} />
                    </Grid>
                    <Grid item xs={2.5}>
                        <Image className='secondImg' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720} />
                    </Grid>

                </Grid>
            </Box>
        </Container><Container className='secondGried' maxWidth="xl" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2.5}>
                            <Image className='secondImg' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720} />
                        </Grid>
                        <Grid item xs={2.5}>
                            <Image className='secondImg' src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg&w=640&q=100" alt="Description of the image" width={1080} height={720} />
                        </Grid>
                        <Grid item xs={7}>
                            <Image src="https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-6.jpg&w=1080&q=100" alt="Description of the image" width={1080} height={720} />
                        </Grid>
                    </Grid>
                </Box>
            </Container></>
);
}
export {HomeSlider};
