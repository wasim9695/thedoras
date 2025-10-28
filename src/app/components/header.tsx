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
} from "@mui/material";
import { motion } from "framer-motion";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchGetProfileDetails, fetchLogout } from "../api/profileAuth/allProfileDetails";
import { fetchCartsAll } from "../api/products/productsAll";

const pathlogo = "/thedoralogo.png";
const pages = [
  "HOME",
  "NEW IN",
  "WOMEN",
  "COLLECTIONS",
  "ACCESSORIES",
  "WORLD OF THE DORA",
  "ABOUT US",
  "CONTACT",
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          {/* Left logo */}
          <motion.div whileHover={{ scale: 1.1 }} style={{ cursor: "pointer" }} onClick={onpageHome}>
            <Image src={pathlogo} alt="left logo" width={150} height={150} style={{ borderRadius: "0%" }} />
          </motion.div>

          {/* Center search bar */}
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

          {/* Right icons */}
          {!getProfile?.fullName ? (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: "#000", textTransform: "none" }}>
                  <Link href={"/signin"} style={{ textDecoration: "none" }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Sign In
                    </Typography>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }}>
                <Button sx={{ color: "#000", textTransform: "none" }}>
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
                  <MenuItem
                    onClick={() => {
                      logOuts();
                    }}
                    sx={{ color: "error.main" }}
                  >
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

        {/* Navigation menu below */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, pb: 2 }}>
          {pages.map((page) => (
            <motion.div whileHover={{ scale: 1.1 }} key={page}>
              <Link href={"/collections"} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    my: 2,
                    color: "#000",
                    fontSize: "1rem",
                    fontWeight: "500",
                    textTransform: "none",
                    mx: 2,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                      borderRadius: "4px",
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
