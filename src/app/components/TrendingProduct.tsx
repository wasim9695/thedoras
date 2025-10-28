"use client";

import * as React from "react";
import { Box, Container, Grid, Typography, Button} from "@mui/material";
import Image from "next/image";
import { fetchFeatured } from "../api/bannerAll/banners";
import { useEffect, useState } from "react";
import Link from "next/link";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

interface Product {
  id: string | number;
  imageUrl: string;
  heading: string;
  pathUrl: string;
  categoriesId: string | number;
  [key: string]: unknown;
}

const TrendingProduct = () => {
  const [getFeatured, setFeatured] = useState<Product[]>([]);

  const getFeatureAllData = async () => {
    try {
      const bannerData = await fetchFeatured();
      if (bannerData.data && bannerData.data.length > 0) {
        setFeatured(bannerData.data);
      }
    } catch {
      // Optional error handling
    }
  };

  useEffect(() => {
    getFeatureAllData();
  }, []);

  return (
    <Container className="thirdGried" maxWidth="xl">
      <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          border: "1px solid #dddddd",
          boxSizing: "border-box",
        }}
      >
        <Typography className="headingProduct" variant="h4" fontWeight="bold">
          Fresh Arrival
        </Typography>

        <Grid container spacing={0} sx={{ mt: 2 }}>
          {/* Left Panel */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              position: "relative",
              height: 600,
              backgroundColor: "#33332f",
              overflow: "hidden",
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              padding: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url(/path-to-floral-pattern.png)",
                backgroundSize: "cover",
                opacity: 0.3,
              },
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                zIndex: 1,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              FLUID
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                zIndex: 1,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                mb: 2,
              }}
            >
              FORMS
            </Typography>
            <Typography
              variant="h5"
              sx={{
                zIndex: 1,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              SHOP CO-ORDS
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                zIndex: 1,
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Help?
            </Button>
          </Grid>

          {/* Middle Panel */}
          {getFeatured.slice(0, 1).map((product, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={`middle-${index}`}
              sx={{
                position: "relative",
                height: 600,
                backgroundColor: "#006400",
                overflow: "hidden",
                borderRadius: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={product.imageUrl}
                alt="Model in orange outfit"
                width={1080}
                height={720}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {product.heading}
                </Typography>
                <Link href={`/shop/${product.pathUrl}/${product.categoriesId}`} passHref legacyBehavior>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      padding: "10px 20px",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </Box>
            </Grid>
          ))}

          {/* Right Panel */}
          {getFeatured.slice(1, 2).map((product, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={`right-${index}`}
              sx={{
                position: "relative",
                height: 600,
                backgroundColor: "#DC143C",
                overflow: "hidden",
                borderRadius: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={product.imageUrl}
                alt="Model in purple outfit"
                width={1080}
                height={720}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {product.heading}
                </Typography>
                <Link href={`/shop/${product.pathUrl}/${product.categoriesId}`} passHref legacyBehavior>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      padding: "10px 20px",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export { TrendingProduct };
