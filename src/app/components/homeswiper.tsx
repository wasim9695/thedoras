"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
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
    <>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", color: "black", mt: 4, mb: 2 }}
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
            <Grid item xs={3} key={product.id} sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  overflow: "hidden",
                  width: "100%",
                  height: "600px",
                }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.subheading}
                  fill
                  style={{ objectFit: "cover" }}
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
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
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
    </>
  );
};

export { HomeSwiper };
