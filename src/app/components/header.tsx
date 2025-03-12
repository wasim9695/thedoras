'use client';

import * as React from 'react';
import { AppBar, Box, Toolbar, Button, Typography, InputBase } from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import Link from 'next/link';

const pathlogo = '/thedoralogo.png';
const pathlogo2 = '/thedora second.png';
const pages = ['HOME', 'NEW IN', 'WOMEN', 'COLLECTIONS', 'PRODUCTS', 'SALE', 'ABOUT US', 'CONTACT'];

const ResponsiveAppBar = () => {
  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <AppBar position="relative" sx={{ backgroundColor: 'transparent', color: '#000', boxShadow: 'none' }}>
        {/* Top centered logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Image src={pathlogo2} alt="top logo" width={200} height={200} style={{ borderRadius: '0%' }} />
          </motion.div>
        </Box>

        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          {/* Left logo */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <Image src={pathlogo} alt="left logo" width={150} height={150} style={{ borderRadius: '0%' }} />
          </motion.div>

          {/* Center search bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '25px',
              px: 2,
              py: 0.5,
              width: '40%',
              maxWidth: '500px',
            }}
          >
            <SearchIcon sx={{ color: '#000', mr: 1 }} />
            <InputBase
              placeholder="Search..."
              sx={{
                flex: 1,
                color: '#000',
                '&::placeholder': {
                  color: '#000',
                  opacity: 0.7,
                },
              }}
            />
          </Box>

          {/* Right icons */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Button sx={{ color: '#000', textTransform: 'none' }}>
                <Link href={"/signin"}><Typography variant="body1" sx={{ fontWeight: 500 }}>Sign In</Typography></Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Button sx={{ color: '#000', textTransform: 'none' }}>
                <ShoppingBagIcon sx={{ fontSize: '1.5rem' }} />
              </Button>
            </motion.div>
          </Box>
        </Toolbar>

        {/* Navigation menu below */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pb: 2 }}>
          {pages.map((page) => (
            <motion.div whileHover={{ scale: 1.1 }} key={page}>
               <Link href={"/collections"} style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  my: 2,
                  color: '#000',
                  fontSize: '1rem',
                  fontWeight: '500',
                  textTransform: 'none',
                  mx: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '4px',
                  },
                }}
              >
                {page}
              </Button>
              </Link>
            </motion.div>
          ))}
        </Box>
      </AppBar>
    </motion.div>
  );
};

export default ResponsiveAppBar;