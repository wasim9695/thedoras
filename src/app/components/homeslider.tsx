"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link"; // Added for linking to pathUrl
import { keyframes } from "@mui/system";
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

const imgss1 = "/imgs2.jpg";

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

const HomeSlider: React.FC = () => {
  const [leftBanner, setLeftBanner] = useState<BannerData | null>(null);
  const [rightBanner, setRightBanner] = useState<BannerData[]>([]);
 const [bottomBanners, setBottomBanners] = useState<BannerData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getBanner = async () => {
    try {
      const bannerData: BannerResponse = await fetchLeftBanner();
      // Use the first banner from the data array
      if (bannerData.data && bannerData.data.length > 0) {
        setLeftBanner(bannerData.data[0]);
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
      setRightBanner(bannerData.data); // set as array
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
      <Container
        maxWidth="xl"
        sx={{
          mt: 0.3,
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={7}
              sx={{ animation: `${fadeIn} 1s ease-out`, position: "relative" }}
            >
              {error ? (
                <Typography color="error">{error}</Typography>
              ) : leftBanner ? (
                <>
                  <Image
                    src={leftBanner.imageUrl}
                    alt={leftBanner.altText}
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
                      {leftBanner.heading}
                    </Typography>
                    <Typography variant="body1" mb={2}>
                      {leftBanner.subheading}
                    </Typography>
                   <Link
  href={`/shop/${leftBanner.pathUrl}/${leftBanner.categoriesId}`}
  passHref
  legacyBehavior
>
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
                </>
              ) : (
                <Typography>Loading banner...</Typography>
              )}
            </Grid>

             {error ? (
    <Typography color="error">{error}</Typography>
  ) : rightBanner && rightBanner.length > 0 ? (
    rightBanner.map((banner) => (
            <Grid
              item
              xs={2.5}
              sx={{
                animation: `${fadeIn} 1s ease-out 0.5s`,
                position: "relative",
              }}
            >
               
    
        <Image
          className="secondImg"
          src={banner.imageUrl}
          alt={banner.altText || "Secondary banner"}
           width={1080}
                height={720}
                style={{ height: "92%", animation: `${holographicShine} 3s infinite` }}
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
            {banner.heading || "New Collection"}
          </Typography>
          <Typography variant="body1" mb={2}>
            {banner.subheading || "Discover our latest fashion arrivals"}
          </Typography>
          <Link
            href={`/shop/${banner.pathUrl}/${banner.categoriesId}`}
            passHref
            legacyBehavior
          >
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
    
    
            </Grid>
             ))
  ) : (
    <Typography>Loading banner...</Typography>
  )}
            {/* <Grid
              item
              xs={2.5}
              sx={{ animation: `${fadeIn} 1s ease-out 1s`, position: "relative" }}
            >
              <Image
                className="secondImg"
                src="https://sakshigirri.com/cdn/shop/files/preview_images/cd8da969291f4aadbc2f51c4e0231233.thumbnail.0000000000_360x.jpg?v=1714636716"
                alt="Secondary banner"
                width={1080}
                height={720}
                style={{ height: "92%", animation: `${holographicShine} 3s infinite` }}
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
                  New Collection
                </Typography>
                <Typography variant="body1" mb={2}>
                  Discover our latest fashion arrivals
                </Typography>
                <Button
                  variant="contained"
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
              </Box>
            </Grid> */}
          </Grid>
        </Box>
      </Container>
      <HomeSwiperMain />
      <Container className="secondGried" maxWidth="xl" sx={{ mb: 5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
             {bottomBanners.length > 0 ? (
        bottomBanners.slice(0, 2).map((banner) => (
            <Grid
              item
              xs={3}
              sx={{ animation: `${fadeIn} 1s ease-out 0.5s`, position: "relative" }}
            >
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
                <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              {banner.heading}
                </Box>
                <Box sx={{ fontSize: "1.2rem" }}> {banner.subheading}</Box>
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
        // Optionally, show a loading or fallback UI
        <Typography>Loading banners...</Typography>
      )}

       {bottomBanners.length > 0 ? (
        bottomBanners.slice(2, 3).map((banner) => (
            
            <Grid
              item
              xs={6}
              sx={{ animation: `${fadeIn} 1s ease-out 1.5s`, position: "relative" }}
            >
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
                <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                  {banner.heading}
                </Box>
                <Box sx={{ fontSize: "1.2rem" }}>{banner.subheading}</Box>
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
        // Optionally, show a loading or fallback UI
        <Typography>Loading banners...</Typography>
      )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export { HomeSlider };