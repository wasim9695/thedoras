"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { keyframes } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { fetchLeftBanner, fetchBottomTwoBanner } from "../api/bannerAll/banners";

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

const HomeSlider: React.FC = () => {
  const [leftBanners, setLeftBanners] = useState<BannerData[]>([]);
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
    } catch (error) {
      console.error("Failed to fetch left banner:", error);
      setError("Failed to load banner");
    }
  };

  const getBottomBanners = async () => {
    try {
      const bannerData: BannerResponse = await fetchBottomTwoBanner();
      if (bannerData.data && bannerData.data.length > 0) {
        setBottomBanners(bannerData.data);
      }
    } catch {
      // Optionally handle error silently
    }
  };

  useEffect(() => {
    getBanner();
    getBottomBanners();
  }, []);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          mt: 0.3,
          fontFamily: "Roboto, sans-serif",
          width: "100vw",
          mx: "calc(-50vw + 50%)",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ animation: `${fadeIn} 1s ease-out`, position: "relative" }}>
              {error ? (
                <Typography color="error">{error}</Typography>
              ) : leftBanners.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                  style={{ height: "720px" }}
                  loop
                >
                  {leftBanners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                        <Image
                          src={banner.imageUrl}
                          alt={banner.altText}
                          fill
                          sizes="100vw"
                          style={{ objectFit: "cover", animation: `${holographicShine} 3s infinite` }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            textAlign: "center",
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            p: 2,
                            borderRadius: 2,
                            maxWidth: "90%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h4" fontWeight="bold" mb={1}>
                            {banner.heading}
                          </Typography>
                          <Typography variant="body1" mb={2}>
                            {banner.subheading}
                          </Typography>
                          <Link href={`/shop/${banner.pathUrl}/${banner.categoriesId}`} passHref legacyBehavior>
                            <Button
                              variant="contained"
                              component="a"
                              sx={{
                                background: "#ba9e75",
                                "&:hover": {
                                  background: "#a78b63",
                                  transform: "scale(1.05)",
                                  transition: "all 0.3s ease",
                                },
                              }}
                            >
                              Shop Now
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ))}
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </Swiper>
              ) : (
                <Typography>Loading banner...</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box className="secondGried" sx={{ mb: 1, mt: 1, width: "100vw", mx: "calc(-50vw + 50%)" }}>
        <Typography className="headingProduct" variant="h5" fontWeight="bold" sx={{ color: "black", textAlign: "center" }}>
          NEW THIS SEASON
        </Typography>
        <Typography sx={{ color: "black", marginBottom: 2, textAlign: "center" }}>Special Discounts Available!</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {bottomBanners.length > 0 ? (
              bottomBanners.slice(0, 2).map((banner) => (
                <Grid key={banner.id} item xs={3} sx={{ animation: `${fadeIn} 1s ease-out 0.5s`, position: "relative" }}>
                  <Image
                    className="secondImg"
                    src={banner.imageUrl}
                    alt={banner.altText}
                    width={1080}
                    height={720}
                    style={{ animation: `${holographicShine} 3s infinite` }}
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
                    <Box sx={{ fontSize: "2rem" }}>{banner.subheading}</Box>
                    <Link href={`/shop/${banner.pathUrl}/${banner.categoriesId}`} passHref legacyBehavior>
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

            {bottomBanners.length > 0 ? (
              bottomBanners.slice(2, 3).map((banner) => (
                <Grid key={banner.id} item xs={6} sx={{ animation: `${fadeIn} 1s ease-out 1.5s`, position: "relative" }}>
                  <Image
                    src={banner.imageUrl}
                    alt={banner.altText}
                    width={1080}
                    height={720}
                    style={{ animation: `${holographicShine} 3s infinite` }}
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
                    <Box sx={{ fontSize: "2rem" }}>{banner.subheading}</Box>
                    <Link href={`/shop/${banner.pathUrl}/${banner.categoriesId}`} passHref legacyBehavior>
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

export { HomeSlider };
