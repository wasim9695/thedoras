"use client";

import * as React from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { fetchBottomBanner } from "../api/bannerAll/banners";
import { useEffect, useState } from "react";
import Link from "next/link";

const imgs = "/imgs.jpg";

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

const HomeSwiperMain = () => {
  const [rightBanner, setRightBanner] = useState<BannerData[]>([]);
  const [error, setError] = useState<string | null>(null);

const getRightBanner = async () => {
  try {
    const bannerData = await fetchBottomBanner();
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

  useEffect(() => {
    getRightBanner();
  }, []);

  const products = [
    {
      id: 1,
      title: "Product 1",
      image: imgs,
    },
    {
      id: 2,
      title: "Product 2",
      image: imgs,
    },
    {
      id: 3,
      title: "Product 3",
      image: imgs,
    },
    {
      id: 4,
      title: "Product 4",
      image: imgs,
    },
    {
      id: 5,
      title: "Product 4",
      image: imgs,
    },
    {
      id: 6,
      title: "Product 4",
      image: imgs,
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={5} // Set to 0 if unnecessary spacing occurs
      slidesPerView={1}
      style={{
        width: "700",
        marginTop: "10px",
        marginBottom: "20px", // Make the Swiper take full width
      }}
      // Ensures active slide is centered
      pagination={{ clickable: true }}
      navigation
      autoplay={{
        delay: 3000, // Auto-slide every 3 seconds
        disableOnInteraction: false, // Keep autoplay running after interactions
      }}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 16 }, // Mobile: 1 slide
        1024: { slidesPerView: 3, spaceBetween: 24 }, // Desktop: 3 slides
      }}
    >
      {rightBanner.map((product) => (
        <SwiperSlide key={product.id}>
          <Box
            sx={{
              textAlign: "center",
              border: "1px solid #ddd",
              borderRadius: 4,
              padding: 2,
              width: "100%",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              position: "relative", // Add position relative to position the offer and button
              backgroundColor: "#ff4500", // Orange background like the reference image
            }}
          >
            <Image
              src={product.imageUrl}
              alt={product.altText}
              width={700}
              height={400}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
              }}
            />
            {/* Offer text and button positioned in the middle */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
              }}
            >
              <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                {product.heading}
              </Box>
              <Box sx={{ fontSize: "1.2rem" }}>{product.subheading}</Box>
              <Link
                href={`/shop/${product.pathUrl}/${product.categoriesId}`}
                passHref
                legacyBehavior
              >
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "black", // Changed to black background
                  color: "white", // Changed to white text
                  "&:hover": {
                    backgroundColor: "#333", // Darker black for hover effect
                  },
                }}
              >
                SHOP NOW
              </Button>
              </Link>
            </Box>
            
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { HomeSwiperMain };