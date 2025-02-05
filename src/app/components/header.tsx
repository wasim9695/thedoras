'use client';

import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import { ResponsiveDialog } from '../components';

const pathlogo = '/logodora.jpeg';
const pages = ['New in', 'Women', 'Collection'];
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
      <AppBar position="relative" sx={{ backgroundColor: '#f0d993', color: '#776248', boxShadow: 'none' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image src={pathlogo} alt="logo" width={80} height={80} style={{ borderRadius: '25%' }} />
            </motion.div>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
              {pages.map((page) => (
                <motion.div whileHover={{ scale: 1.1 }} key={page}>
                  <Button sx={{ my: 2, color: '#776248', fontSize: '1rem', fontWeight: '500' }}>{page}</Button>
                </motion.div>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: '#776248' }} onClick={handleClickOpen}>
                  <SearchIcon />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: '#776248' }}>
                  <Typography>Sign In</Typography>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: '#776248' }}>
                  <ShoppingBagIcon />
                </Button>
              </motion.div>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ResponsiveDialog open={open} onClose={handleClose} />
    </motion.div>
  );
};

export default ResponsiveAppBar;
