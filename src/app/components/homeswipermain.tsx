"use client"
import * as React from 'react';
import { Box} from '@mui/material';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
const HomeSwiperMain = () =>{

    const products = [
        {
          id: 1,
          title: 'Product 1',
      
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-1.jpg&w=1920&q=100',
        },
        {
          id: 2,
          title: 'Product 2',
    
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-1.jpg&w=1920&q=100',
        },
        {
          id: 3,
          title: 'Product 3',
    
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-1.jpg&w=1920&q=100',
        },
        {
          id: 4,
          title: 'Product 4',
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-1.jpg&w=1920&q=100',
        },
        {
          id: 5,
          title: 'Product 4',
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-1.jpg&w=1920&q=100',
        },
        {
          id: 6,
          title: 'Product 4',
    
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-1.jpg&w=1920&q=100',
        },
      ];

    return (
<><Swiper 
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={5} // Set to 0 if unnecessary spacing occurs
        slidesPerView={1}
        style={{
          width: '700',
          marginTop:'10px',
          marginBottom:'20px' // Make the Swiper take full width
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
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Box
              sx={{
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: 4,
                padding: 2,
                width: '100%',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={700}
                height={400}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto',
                }}
              />
              
            </Box>
          </SwiperSlide>
        ))}
      </Swiper></>
    );
}
export {HomeSwiperMain}