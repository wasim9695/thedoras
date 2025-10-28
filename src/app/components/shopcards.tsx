"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { fetchgetCog } from "../api/categories/categ";

const defaultImage = "/img4.jpg";

interface Category {
  _id: string;
  image?: string;
  metaTitle?: string;
  categoryName: string;
}

const ShopCards = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllCategs = async () => {
      try {
        const resData = await fetchgetCog();
        if (resData.data && Array.isArray(resData.data)) {
          setCategories(resData.data);
        } else {
          setError("No category data available");
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
      }
    };

    getAllCategs();
  }, []);

  return (
    <Container className="fourthCards" maxWidth="xl">
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Typography className="headingProduct" variant="h4" fontWeight="bold">
          Shop By Category
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={5}
          style={{ width: "100%", marginTop: "10px", marginBottom: "20px" }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link href={`/shop/${category._id}`} passHref>
                <Box
                  className="group relative overflow-hidden"
                  sx={{
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    padding: 2,
                    width: "100%",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "300px",
                      overflow: "hidden",
                      borderRadius: 4,
                    }}
                  >
                    <Image
                      src={category.image || defaultImage}
                      alt={category.metaTitle || "Category"}
                      fill
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      className="group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <Box
                      className="group-hover:opacity-100"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 4,
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="text-white text-4xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M326.612 185.391c59.747 59.809..."></path>
                      </svg>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {category.categoryName}
                  </Typography>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export { ShopCards };
