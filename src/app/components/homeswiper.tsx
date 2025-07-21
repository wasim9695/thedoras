"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link"; // Added for linking to pathUrl
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { fetchBottomThreeBanner } from "../api/bannerAll/banners";

// Define the Product type for better type safety
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

const HomeSwiper = () => {
  const [products, setProducts] = useState<BannerData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getFastivalBanner = async () => {
    try {
      const bannerData = await fetchBottomThreeBanner();
      if (bannerData.data && bannerData.data.length > 0) {
        console.log(bannerData.data);
        setProducts(bannerData.data);
      } else {
        setProducts([]);
        setError("No festival banner data available");
      }
    } catch (err) {
      setError("Failed to load festival banners");
      setProducts([]);
    }
  };

  useEffect(() => {
    getFastivalBanner();
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
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "black",
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        Explore Now - Exclusive Discounts!
      </Typography>
      {products.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No banners available
        </Typography>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={3}
          style={{
            width: "100%",
            marginTop: "10px",
            marginBottom: "20px",
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  borderRadius: 4,
                  overflow: "hidden",
                  width: "100%",
                  height: "400px",
                }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.subheading}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
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
                    padding: 2,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      backgroundColor: "#ff5722",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 2,
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.subheading}%
                  </Box>
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
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export {HomeSwiper};