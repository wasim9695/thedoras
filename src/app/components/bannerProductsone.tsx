"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link"; // Added for linking to pathUrl
import { keyframes } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { HomeSwiperMain } from "../components";
import { fetchLeftBanner, fetchRightBanner, fetchBottomTwoBanner } from "../api/bannerAll/banners";

// Define the expected banner data structure
interface BannerData {
  id: number;
  categoriesId: number;
  imageUrl: string;
  altText: string;
  pathUrl: string;
  heading: string;
  subheading: string;
  status: string;
  typeImages: string;
}

interface BannerResponse {
  status: number;
  message: string;
  data: BannerData[];
}

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

const holographicShine = keyframes`
  0% {
    filter: brightness(1) contrast(1);
  }
  50% {
    filter: brightness(1.2) contrast(1.2);
  }
  100% {
    filter: brightness(1) contrast(1);
  }
`;

const BannerProductsone: React.FC = () => {
  const [leftBanners, setLeftBanners] = useState<BannerData[]>([]);
  const [rightBanner, setRightBanner] = useState<BannerData[]>([]);
  const [bottomBanners, setBottomBanners] = useState<BannerData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getBanner = async () => {
    try {
      const bannerData: BannerResponse = await fetchLeftBanner();
      if (bannerData.data && bannerData.data.length > 0) {
        setLeftBanners(bannerData.data);
      } else {
        setError("No banner data available");
      }
    } catch (err) {
      console.error("Failed to fetch left banner:", err);
      setError("Failed to load banner");
    }
  };

  const getRightBanner = async () => {
    try {
      const bannerData = await fetchRightBanner();
      if (bannerData.data && bannerData.data.length > 0) {
        setRightBanner(bannerData.data);
      } else {
        setRightBanner([]);
        setError("No right banner data available");
      }
    } catch (err) {
      setError("Failed to load right banners");
      setRightBanner([]);
    }
  };

  const getBottomBanners = async () => {
    try {
      const bannerData: BannerResponse = await fetchBottomTwoBanner();
      if (bannerData.data && bannerData.data.length > 0) {
        setBottomBanners(bannerData.data);
      }
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    getBanner();
    getRightBanner();
    getBottomBanners();
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        className="secondGried"
        sx={{ mb: 5, width: "100vw", mx: "calc(-50vw + 50%)" }}
      >

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            {bottomBanners.length > 0 ? (
              bottomBanners.slice(2, 3).map((banner) => (
                <Grid
                  key={banner.id}
                  item
                  xs={12}
                  sx={{ animation: `${fadeIn} 1s ease-out 1.5s`, position: "relative" }}
                >
                  <Image
                    src="https://sabyasachi.com/cdn/shop/files/1_cf7afc23-095b-450d-b8bf-ebf192a351b4_1920x@2x.jpg?v=1738655929"
                    alt={banner.altText}
                    width={1080}
                    height={720}
                    style={{ animation: `${holographicShine} 3s infinite` , width:'100%'}}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                      {banner.heading}
                    </Box> */}
                    <Box sx={{ fontSize: "2rem" }}>{banner.subheading}</Box>
                    <Link
                      href={`/shop/${banner.pathUrl}/${banner.categoriesId}`}
                      passHref
                      legacyBehavior
                    >
                      <Button
                        variant="contained"
                        sx={{
                          mt: 2,
                          backgroundColor: "black",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#333",
                            transform: "scale(1.05)",
                            transition: "all 0.3s ease",
                          },
                        }}
                      >
                        EXPLORE NOW
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography>Loading banners...</Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export { BannerProductsone };