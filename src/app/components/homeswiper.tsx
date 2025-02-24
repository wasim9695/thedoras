"use client";
import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const sp = '/img3.jpg'; // Replace with your actual image path

const HomeSwiper = () => {
  const products = [
    {
      id: 1,
      title: 'Product 1',
      image: sp,
      discount: '20% OFF',
    },
    {
      id: 2,
      title: 'Product 2',
      image: sp,
      discount: '15% OFF',
    },
    {
      id: 3,
      title: 'Product 3',
      image: sp,
      discount: '10% OFF',
    },
    {
      id: 4,
      title: 'Product 4',
      image: sp,
      discount: '25% OFF',
    },
    {
      id: 5,
      title: 'Product 5',
      image: sp,
      discount: '30% OFF',
    },
    {
      id: 6,
      title: 'Product 6',
      image: sp,
      discount: '5% OFF',
    },
  ];

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'black',
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        Explore Now - Exclusive Discounts!
      </Typography>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={3}
        style={{
          width: '100%',
          marginTop: '10px',
          marginBottom: '20px',
        }}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 16 }, // Mobile: 1 slide
          1024: { slidesPerView: 3, spaceBetween: 24 }, // Desktop: 3 slides
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Box
              sx={{
                position: 'relative',
                textAlign: 'center',
                borderRadius: 4,
                overflow: 'hidden',
                width: '100%',
                height: '400px', // Fixed height for consistency
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill // Use fill to make the image cover the container
                style={{
                  objectFit: 'cover',
                }}
              />
              {/* Overlay for better readability */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                }}
              >
                {/* Discount Label */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: '#ff5722',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 2,
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {product.discount}
                </Box>
                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {product.title}
                </Typography>
                {/* Button */}
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Explore
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export { HomeSwiper };