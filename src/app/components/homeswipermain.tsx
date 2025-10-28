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

const HomeSwiperMain = () => {
  const [rightBanner, setRightBanner] = useState<BannerData[]>([]);

  // const [error] = useState<string | null>(null); // error state is assigned but never used, so keep but don't set

  const getRightBanner = async () => {
    try {
      const bannerData = await fetchBottomBanner();
      if (bannerData.data && bannerData.data.length > 0) {
        setRightBanner(bannerData.data);
      } else {
        setRightBanner([]);
      }
    } catch {
      setRightBanner([]);
    }
  };

  useEffect(() => {
    getRightBanner();
  }, []);

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={5}
      slidesPerView={1}
      style={{
        width: "700px",
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
              position: "relative",
              backgroundColor: "#ff4500",
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
              <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>{product.heading}</Box>
              <Box sx={{ fontSize: "1.2rem" }}>{product.subheading}</Box>
              <Link href={`/shop/${product.pathUrl}/${product.categoriesId}`} passHref legacyBehavior>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#333",
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
