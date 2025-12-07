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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchGetProfileDetails, fetchLogout } from "../api/profileAuth/allProfileDetails";
import { fetchCartsAll } from "../api/products/productsAll";

const pathlogo = "/thedoralogo.png";
const pages = [
  { label: "HOME", href: "/" },
  { label: "NEW IN", href: "/new-in" },
  { label: "WOMEN", href: "/women" },
  { label: "collections", href: "/collections" },
  { label: "ACCESSORIES", href: "/accessories" },
  { label: "world of the Ddora", href: "/world-of-the-dora" },
  { label: "about us", href: "/about-us" },
  { label: "contact us", href: "/contact-us" },
];

interface Profile {
  fullName?: string;
  [key: string]: unknown;
}

interface CartData {
  cartDetails?: Array<{
    cartTotalRows?: number;
  }>;
  [key: string]: unknown;
}

const ResponsiveAppBar = () => {
  const router = useRouter();
  const [getProfile, setGetProfiles] = useState<Profile | null>(null);
  const [totalCart, setTotalCart] = useState<CartData | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const logOuts = () => {
    fetchLogout();
    router.push("/signin");
    localStorage.removeItem("authToken");
  };

  const onpageHome = () => {
    router.push("/");
  };

  const getAllPr = async () => {
    try {
      const response = await fetchGetProfileDetails();
      setGetProfiles(response);
    } catch {
      // Optional error handling
    }
  };

  const getAllCartT = async () => {
    try {
      const response = await fetchCartsAll();
      setTotalCart(response.data);
    } catch {
      // Optional error handling
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getAllPr();
      getAllCartT();
    }
  }, []);

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mb: 3, fontWeight: 600, px: 2 }}
        onClick={onpageHome}
        style={{ cursor: "pointer" }}
      >
        THE DORA
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItemButton
            key={page.href}
            onClick={() => {
              router.push(page.href);
              handleDrawerToggle();
            }}
            sx={{
              textTransform: "uppercase",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <ListItemText primary={page.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <AppBar position="relative" sx={{ backgroundColor: "transparent", color: "#000", boxShadow: "none" }}>
        {/* Top centered logo */}
        <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
          <motion.div whileHover={{ scale: 1.1 }} style={{ cursor: "pointer" }} onClick={onpageHome}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "#1a1a1a",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              THE DORA
            </Typography>
          </motion.div>
        </Box>

        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0 }}>
          {/* Left: logo + menu icon on mobile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open navigation"
                onClick={handleDrawerToggle}
                sx={{ color: "#000" }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <motion.div whileHover={{ scale: 1.1 }} style={{ cursor: "pointer" }} onClick={onpageHome}>
              <Image src={pathlogo} alt="left logo" width={120} height={120} style={{ borderRadius: "0%" }} />
            </motion.div>
          </Box>

          {/* Center search bar (desktop only) */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                borderRadius: "25px",
                px: 2,
                py: 0.5,
                width: "40%",
                maxWidth: "500px",
              }}
            >
              <SearchIcon sx={{ color: "#000", mr: 1 }} />
              <InputBase
                placeholder="Search..."
                sx={{
                  flex: 1,
                  color: "#000",
                  "&::placeholder": {
                    color: "#000",
                    opacity: 0.7,
                  },
                }}
              />
            </Box>
          )}

          {/* Right icons */}
          {!getProfile?.fullName ? (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: "#000", textTransform: "none" }}>
                  <Link href="/signin" style={{ textDecoration: "none" }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Sign In
                    </Typography>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: "#000", textTransform: "none" }} onClick={() => router.push("/cartdetail")}>
                  <ShoppingBagIcon sx={{ fontSize: "1.5rem" }} />
                </Button>
              </motion.div>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <motion.div whileHover={{ scale: 1.08 }}>
                <Button
                  onClick={handleMenuOpen}
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    borderRadius: "25px",
                    px: 2,
                    py: 1,
                    background: "rgba(0,0,0,0.02)",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                  }}
                >
                  <Avatar sx={{ width: 28, height: 28, fontSize: 16, bgcolor: "#ccc", color: "#222" }}>
                    {getProfile?.fullName?.[0]?.toUpperCase() ?? "U"}
                  </Avatar>
                  <Typography variant="body1" sx={{ fontWeight: 400 }}>
                    {getProfile?.fullName}
                  </Typography>
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
                  <MenuItem onClick={logOuts} sx={{ color: "error.main" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }}>
                <Button
                  onClick={() => router.push("/cartdetail")}
                  type="button"
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    px: 2,
                    position: "relative",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.03)",
                    "&:hover": {
                      background: "#fafafa",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    },
                    minWidth: 0,
                  }}
                >
                  <Badge
                    badgeContent={totalCart?.cartDetails?.[0]?.cartTotalRows || 0}
                    color="error"
                    overlap="circular"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                        right: -5,
                        top: 6,
                      },
                    }}
                  >
                    <ShoppingBagIcon sx={{ fontSize: "2rem" }} />
                  </Badge>
                </Button>
              </motion.div>
            </Box>
          )}
        </Toolbar>

        {/* Desktop navigation menu */}
        {!isMobile && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
            {pages.map((page) => (
              <motion.div whileHover={{ scale: 1.1 }} key={page.href}>
                <Link href={page.href} style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      my: 2,
                      color: "#000",
                      fontSize: "1rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      mx: 2,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    {page.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </Box>
        )}
      </AppBar>

      {/* Mobile drawer navigation */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxShadow: "4px 0 12px rgba(0,0,0,0.1)",
            width: 260,
          },
        }}
      >
        {drawer}
      </Drawer>
    </motion.div>
  );
};

export default ResponsiveAppBar;
