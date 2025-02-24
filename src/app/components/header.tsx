'use client';

import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, InputBase } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import { ResponsiveDialog } from '../components';

const pathlogo = '/thedoralogo.png';
const pages = ['HOME','NEW IN', 'WOMEN', 'COLLECTIONS','PRODUCTS', 'SALE', 'CONTACT'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <AppBar position="relative" sx={{ backgroundColor: 'transparent', color: '#000', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo on the left */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image src={pathlogo} alt="logo" width={200} height={200} style={{ borderRadius: '25%' }} />
            </motion.div>

            {/* Search bar in the middle */}
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
                mx: 2,
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

            {/* Icons on the right */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: '#000', textTransform: 'none' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Sign In</Typography>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: '#000', textTransform: 'none' }}>
                  <ShoppingBagIcon sx={{ fontSize: '1.5rem' }} />
                </Button>
              </motion.div>
            </Box>
          </Toolbar>

          {/* Menu Below */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {pages.map((page) => (
              <motion.div whileHover={{ scale: 1.1 }} key={page}>
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
              </motion.div>
            ))}
          </Box>
        </Container>
      </AppBar>
      <ResponsiveDialog open={open} onClose={handleClose} />
    </motion.div>
  );
};

export default ResponsiveAppBar;