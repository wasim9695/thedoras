"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { Box, Container, CssBaseline, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// import {HomeSlider} from './components/homeslider';
// import {OfferHome} from './components/offerHome';
import { useAnimation, AnimationControls, inView, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import InstagramIcon from "@mui/icons-material/Instagram"
import {HomeSlider, OfferHomes, HomeSwiper, ShopCards, FeaturedProduct, DiscountBanner,
   NewArrival} from './components';


const Item = styled(Paper)(({ theme }) => ({ position: "relative", cursor:'pointer',
    padding: theme.spacing(0), textAlign: "center",
    color: theme.palette.text.secondary, backgroundColor: "#fff", 
    overflow: "hidden", "& img": { width: "100%", height: "auto", display: "block", },
     "&:hover div": { opacity: 1, }, })); const HoverOverlay = styled("div")(
      ({ theme }) => ({ position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
         backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center"
         , justifyContent: "center", opacity: 0, transition: "opacity 0.3s ease-in-out", color: "#fff", }));

export default function Home() {
  const leftAnimation: AnimationControls = useAnimation();
  const rightAnimation: AnimationControls = useAnimation();

  const { ref: leftRef, inView: leftInView } = useInView({
    threshold: 0.2, // Trigger when 20% is visible
  });
  const { ref: rightRef, inView: rightInView } = useInView({
    threshold: 0.2, // Trigger when 20% is visible
  });

  const images = [ "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75", 
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75"
  ]; // Add more URLs if needed ];
    
  useEffect(() => {
    if (leftInView) {
      leftAnimation.start({
        x: 0, // Slide into view
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      leftAnimation.start({
        x: "-100vw", // Hide offscreen
        opacity: 0,
      });
    }

    if (rightInView) {
      rightAnimation.start({
        x: 0, // Slide into view
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      rightAnimation.start({
        x: "100vw", // Hide offscreen
        opacity: 0,
      });
    }

  }, [leftInView, leftAnimation, rightInView, rightAnimation]);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <HomeSlider/>
      
      <OfferHomes/>
    
      <HomeSwiper/>
     
      <div ref={leftRef} style={{overflow: "hidden"}}>
      <motion.div animate={leftAnimation} initial={{ x: "-100vw", opacity: 0 }}>
      <ShopCards/>
      </motion.div>
      </div>
      <div ref={rightRef} style={{overflow: "hidden"}}>
      <motion.div animate={rightAnimation} initial={{ x: "100vw", opacity: 0 }}>
      <FeaturedProduct/>
      </motion.div></div>
      <DiscountBanner/>
      <NewArrival/>
      {/* Social Icons */}
       {/* Social Icons */} <Grid item xs={12}> <Grid container spacing={2}> {images.map((image, index) => ( <Grid item xs={2} key={index}> <Item> <img src={image} alt={`Instagram ${index + 1}`} /> <HoverOverlay> <InstagramIcon style={{ fontSize: 40 }} /> </HoverOverlay> </Item> </Grid> ))} </Grid> </Grid>
       <Divider
           orientation="vertical"
           flexItem // Ensures the divider spans the full height of the parent
           sx={{
             borderColor: "#ccc", // Optional: Divider color
             borderWidth: "1px",
             marginTop:"20px",
             marginBottom:"20px;" // Optional: Divider thickness
           }}
         />
  
    </React.Fragment>
  );
}
