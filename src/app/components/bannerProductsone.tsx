"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { keyframes } from "@mui/system";
import { fetchBottomTwoBanner } from "../api/bannerAll/banners";

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
  const [bottomBanners, setBottomBanners] = useState<BannerData[]>([]);

  const getBottomBanners = async (): Promise<void> => {
    try {
      const bannerData: BannerResponse = await fetchBottomTwoBanner();
      if (bannerData.data && bannerData.data.length > 0) {
        setBottomBanners(bannerData.data);
      }
    } catch {
      console.error("Failed to load bottom banners");
    }
  };

  useEffect(() => {
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
                  sx={{
                    animation: `${fadeIn} 1s ease-out 1.5s`,
                    position: "relative",
                  }}
                >
                  <Image
                    src={
                      banner.imageUrl ||
                      "https://sabyasachi.com/cdn/shop/files/1_cf7afc23-095b-450d-b8bf-ebf192a351b4_1920x@2x.jpg?v=1738655929"
                    }
                    alt={banner.altText}
                    width={1080}
                    height={720}
                    style={{ animation: `${holographicShine} 3s infinite`, width: "100%" }}
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
