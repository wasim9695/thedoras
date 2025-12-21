"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchGetProfileDetails } from "../api/profileAuth/allProfileDetails";
import { fetchCartsAll } from "../api/products/productsAll";
import Link from "next/link";

const pathlogo = "/thedoralogo.png";

const pages = [
  { label: "HOME", href: "/" },
  { label: "WOMEN", href: "/women" },
  { label: "JEWELRY", href: "/JEWELRY" },
  { label: "ACCESSORIES", href: "/ACCESSORIES" },
  { label: "GIFTING", href: "/GIFTING" },
  { 
    label: "SEASONS BY THE DORA", 
    href: "/GIFTING",
    submenu: [
      { label: "JANUARY", href: "/women/new" },
      { label: "FEBRUARY", href: "/women/clothing" },
      { label: "MARCH", href: "/women/acc" },
      { label: "APRIL", href: "/women/acc" },
      { label: "MAY", href: "/women/acc" },
      { label: "JUNE", href: "/women/acc" },
      { label: "JULY", href: "/women/acc" },
      { label: "AUGUST", href: "/women/acc" },
      { label: "SEPTEMBER", href: "/women/acc" },
      { label: "OCTOBER", href: "/women/acc" },
      { label: "NOVEMBER", href: "/women/acc" },
      { label: "DECEMBER", href: "/women/acc" }
    ]
    
  },
  { 
    label: "Evergreen shades By THE DORA", 
    href: "/GIFTING",
    submenu: [
      { label: "1950 - 2026 Fashion", href: "/women/new" },
    ]
   },
  { label: "ABOUT THE DORA", href: "/about-us" }
];

const ResponsiveAppBar = () => {
  const router = useRouter();
  const [getProfile, setGetProfiles] = useState<any>(null);
  const [totalCart, setTotalCart] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const [navAnchorEl, setNavAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const handleMenuOpen = (event: any) => {
  setAnchorEl(event.currentTarget);
};

// 3. Close function: triggered when clicking outside or on an item
const handleMenuClose = () => {
  setAnchorEl(null);
};

// 4. Logout function: closes menu and clears session
const handleLogout = () => {
  handleMenuClose(); // Always close the menu first
  // logOuts();        // Your existing logout logic
};

  const handleNavOpen = (event: React.MouseEvent<HTMLElement>, label: string) => {
    setNavAnchorEl(event.currentTarget);
    setActiveMenu(label);
  };

  const handleNavClose = () => {
    setNavAnchorEl(null);
    setActiveMenu(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prof = await fetchGetProfileDetails();
        const cart = await fetchCartsAll();
        setGetProfiles(prof);
        setTotalCart(cart.data);
      } catch (e) {}
    };
    fetchData();
  }, []);

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 3, fontWeight: 600 }}>THE DORA</Typography>
      <List>
        {pages.map((page) => (
          <ListItemButton key={page.label} onClick={() => { router.push(page.href); setMobileOpen(false); }}>
            <ListItemText primary={page.label} sx={{ textTransform: "uppercase" }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <AppBar position="relative" sx={{ backgroundColor: "transparent", color: "#000", boxShadow: "none" }}>
        
        {/* Logo Section */}
        <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
          <motion.div whileHover={{ scale: 1.1 }} style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#1a1a1a" }}>
              THE DORA
            </Typography>
          </motion.div>
        </Box>

        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && <IconButton onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>}
            <Image src={pathlogo} alt="logo" width={120} height={120} />
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.05)", borderRadius: "25px", px: 2, py: 0.5, width: "40%" }}>
              <SearchIcon sx={{ color: "#000", mr: 1 }} />
              <InputBase placeholder="Search..." sx={{ flex: 1 }} />
            </Box>
          )}

         <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
  {getProfile ? (
    /* Wrap both components in a Fragment */
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: "#000", textTransform: "none", display: "flex", gap: 1 }}
      >
        <Avatar sx={{ width: 28, height: 28 }}>{getProfile?.fullName?.[0]}</Avatar>
        <Typography>{getProfile?.fullName}</Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 180,
            py: 1,
            boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} href="/account">
          My Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            
          }}
          sx={{ color: "error.main" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Button onClick={() => router.push("/signin")} sx={{ color: "#000" }}>
      Sign In
    </Button>
  )}

  <IconButton onClick={() => router.push("/cartdetail")}>
    <Badge badgeContent={totalCart?.cartDetails?.[0]?.cartTotalRows || 0} color="error">
      <ShoppingBagIcon sx={{ fontSize: "2rem", color: "#000" }} />
    </Badge>
  </IconButton>
</Box>
        </Toolbar>

        {/* Desktop Navigation with 2-Column Submenu */}
        {!isMobile && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
            {pages.map((page) => (
              <Box 
                key={page.label} 
                onMouseEnter={(e) => page.submenu && handleNavOpen(e, page.label)}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    sx={{
                      my: 2, color: "#000", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase", mx: 1,
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                    }}
                    endIcon={page.submenu ? (
                      <KeyboardArrowDownIcon sx={{ 
                        transition: '0.3s', 
                        transform: activeMenu === page.label ? 'rotate(180deg)' : 'rotate(0deg)' 
                      }} />
                    ) : null}
                    onClick={() => !page.submenu && router.push(page.href)}
                  >
                    {page.label}
                  </Button>
                </motion.div>

                {page.submenu && (
                  <Menu
                    anchorEl={navAnchorEl}
                    open={Boolean(navAnchorEl) && activeMenu === page.label}
                    onClose={handleNavClose}
                    MenuListProps={{ 
                      onMouseLeave: handleNavClose,
                      sx: { 
                        display: 'grid', 
                        // If items > 5, use 2 columns, otherwise use 1
                        gridTemplateColumns: page.submenu.length > 5 ? 'repeat(2, 1fr)' : '1fr', 
                        gap: '2px',
                        p: 1.5 
                      } 
                    }}
                    disableScrollLock
                    PaperProps={{
                      sx: { 
                        boxShadow: "0 12px 24px rgba(0,0,0,0.15)", 
                        mt: 1, 
                        borderRadius: '12px', 
                        minWidth: page.submenu.length > 5 ? '380px' : '200px',
                        border: '1px solid rgba(0,0,0,0.05)'
                      }
                    }}
                  >
                    {page.submenu.map((sub) => (
                      <MenuItem 
                        key={sub.label} 
                        onClick={() => { router.push(sub.href); handleNavClose(); }} 
                        sx={{ 
                          py: 1, 
                          px: 2,
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          borderRadius: '6px',
                          "&:hover": { backgroundColor: "#f5f5f5" }
                        }}
                      >
                        {sub.label}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            ))}
          </Box>
        )}
      </AppBar>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>{drawer}</Drawer>
    </motion.div>
  );
};

export default ResponsiveAppBar;