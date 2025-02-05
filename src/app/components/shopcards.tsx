import * as React from 'react';
import { Box, Container, Typography} from '@mui/material';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const ShopCards = () =>{

    const products = [
        {
          id: 1,
          title: 'Product 1',
      
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Fman.jpg&w=256&q=100',
        },
        {
          id: 2,
          title: 'Product 2',
    
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Fman.jpg&w=256&q=100',
        },
        {
          id: 3,
          title: 'Product 3',
    
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Fman.jpg&w=256&q=100',
        },
        {
          id: 4,
          title: 'Product 4',
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Fman.jpg&w=256&q=100',
        },
        {
          id: 5,
          title: 'Product 4',
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Fman.jpg&w=256&q=100',
        },
        {
          id: 6,
          title: 'Product 4',
    
          image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Fman.jpg&w=256&q=100',
        },
      ];

    return(
<><Container className='fourthCards' maxWidth="xl">
          <Box sx={{ flexGrow: 1, padding: 4, // Padding inside the container
           }} >
<Typography className='headingProduct' variant="h4" fontWeight="bold">Shop By Category</Typography>
<Swiper 
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={5} // Set to 0 if unnecessary spacing occurs
        slidesPerView={5}
        style={{
          width: '100%',
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
          1024: { slidesPerView: 5, spaceBetween: 24 }, // Desktop: 3 slides
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Box className="group relative overflow-hidden"
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
                width={300}
                height={300}
                className='transition-transform duration-300 ease-in-out group-hover:scale-110'
                
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
              {product.title}
                   </Typography>
              
            </Box>
            <div className="bgd absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-70"></div>

{/* Hover effect icon */}
<div className="absolute inset-0 flex items-center justify-center">
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className="text-white text-2xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
  </svg>
</div>
            </SwiperSlide>
        ))}
      </Swiper>

           </Box>
           </Container></>
    );
}
export {ShopCards}