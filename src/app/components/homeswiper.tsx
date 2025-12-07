"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { fetchBottomThreeBanner } from "../api/bannerAll/banners";

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

const HomeSwiper = () => {
  const [products, setProducts] = useState<BannerData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getFestivalBanner = async () => {
    try {
      const bannerData = await fetchBottomThreeBanner();
      if (bannerData.data && bannerData.data.length > 0) {
        setProducts(bannerData.data);
      } else {
        setProducts([]);
        setError("No festival banner data available");
      }
    } catch {
      setError("Failed to load festival banners");
      setProducts([]);
    }
  };

  useEffect(() => {
    getFestivalBanner();
  }, []);

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!products) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "black",
          mb: 4,
          // Responsive font size
          fontSize: { xs: '1.5rem', md: '2.125rem' } 
        }}
      >
        Explore Now - Exclusive Discounts! Shop By Category
      </Typography>

      {products.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No banners available
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {products.slice(0, 4).map((product) => (
            <Grid 
              item 
              key={product.id} 
              // RESPONSIVE BREAKPOINTS:
              xs={12}      // Full width on mobile
              sm={6}       // 2 items per row on tablets
              md={3}       // 4 items per row on desktop
            >
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  overflow: "hidden",
                  width: "100%",
                  // Responsive height: Shorter on mobile, taller on desktop
                  height: { xs: "300px", md: "600px" },
                  borderRadius: "8px", // Added styling
                }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.altText || product.heading}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }}
                  >
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
                        fontWeight: "bold",
                        padding: "10px 20px",
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                      }}
                    >
                      Explore
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export { HomeSwiper };