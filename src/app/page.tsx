"use client";

import React from "react";
import Image from "next/image";
import { CssBaseline, Divider, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { HomeSlider } from './components/homeslider';
// import { OfferHome } from './components/offerHome';
// import { useAnimation, AnimationControls } from "framer-motion";
// import { useInView } from "react-intersection-observer";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  HomeSlider,
  BannerProductsone,
  HomeSwiper,
  FeaturedProduct,
  DiscountBanner,
  TrendingProduct,
} from "./components";
import ShoppingCart from "./components/shoppingcart";

const Item = styled(Paper)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#fff",
  overflow: "hidden",
  "& img": { width: "100%", height: "auto", display: "block" },
  "&:hover div": { opacity: 1 },
}));

const HoverOverlay = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  color: "#fff",
}));

export default function Home() {
  const images = [
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
    "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
  ];

  return (
    <>
      <CssBaseline />
      <HomeSlider />
      <BannerProductsone />
      {/* <OfferHomes /> */}
      <HomeSwiper />
      {/* 
      <div style={{ overflow: "hidden" }}>
        {/* Animation divs commented for unused refs and animation vars */}
        {/* <ShopCards /> */}
      {/*</div>*/}
      <FeaturedProduct />
      <DiscountBanner />
      <TrendingProduct />
      {/* <NewArrival /> */}

      {/* Social Icons */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item xs={2} key={index}>
              <Item>
                <Image src={image} width={50} height={50} alt={`Instagram ${index + 1}`} />
                <HoverOverlay>
                  <InstagramIcon style={{ fontSize: 40 }} />
                </HoverOverlay>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "#ccc",
          borderWidth: "1px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      <ShoppingCart />
    </>
  );
}
