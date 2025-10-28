"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import ShoppingCart, { ShoppingCartHandle } from "../components/shoppingcart";
import { fetchProductsAllNewAr } from "../api/products/productsAll";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  position: "relative",
  overflow: "hidden",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const ImageContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "auto",
  "& .primary-image": {
    transition: "opacity 0.3s ease-in-out",
  },
  "& .secondary-image": {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .primary-image": {
    opacity: 0,
  },
  "&:hover .secondary-image": {
    opacity: 1,
  },
});

interface Product {
  _id: number;
  productImage: string;
  gallaryImages: string[];
  name: string;
  description: string;
  totalPrice: number;
  productId: number;
  quantity: number;
  size: string;
}

const NewArrival = () => {
  const [offerBanner, setOfferBanner] = useState<Product[]>([]);
  const cartRef = useRef<ShoppingCartHandle>(null);

  const getOfferBanner = async () => {
    try {
      const bannerData = await fetchProductsAllNewAr();
      if (bannerData?.data?.length > 0) {
        const parsedData: Product[] = bannerData.data.map((product: Product) => ({
          ...product,
          gallaryImages:
            typeof product.gallaryImages === "string"
              ? JSON.parse(product.gallaryImages)
              : product.gallaryImages || [],
        }));
        setOfferBanner(parsedData);
      } else {
        setOfferBanner([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    getOfferBanner();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      if (cartRef.current) {
        cartRef.current.handleAddToCart(product);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

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
        <Typography className="headingProduct" variant="h4" fontWeight="bold" sx={{ color: "black" }}>
          New Arrivals
        </Typography>
        <Typography variant="h6" sx={{ color: "black", marginBottom: 2 }}>
          Explore the Latest Trends!
        </Typography>
        <ShoppingCart ref={cartRef} />
        {/* First Stack */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          {offerBanner.slice(0, 4).map((product) => (
            <Item className="product-item" key={product._id}>
              <Link href={`/productdetail/${product._id}`}>
                <ImageContainer>
                  <Image
                    className="primary-image"
                    src={product.productImage}
                    alt="Primary image"
                    width={1080}
                    height={720}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Image
                    className="secondary-image"
                    src={product.gallaryImages[0]}
                    alt="Secondary image"
                    width={1080}
                    height={720}
                    style={{ width: "100%", height: "auto" }}
                  />
                </ImageContainer>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "black" }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575", marginBottom: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="h6" sx={{ color: "#ff5722", fontWeight: "bold" }}>
                  ₹ {product.totalPrice} &nbsp;
                  <span style={{ textDecoration: "line-through", color: "#e04a4a" }}>
                    ₹ {product.totalPrice}
                  </span>
                </Typography>
              </Link>
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
                onClick={() => addToCart(product)}
              >
                Buy Now
              </Button>
            </Item>
          ))}
        </Stack>
        {/* Second Stack */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ mt: 2 }}>
          {offerBanner.slice(0, 4).map((product) => (
            <Item className="product-item" key={product._id}>
              <Link href={`/productdetail/${product._id}`}>
                <ImageContainer>
                  <Image
                    className="primary-image"
                    src={product.productImage}
                    alt="Primary image"
                    width={1080}
                    height={720}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Image
                    className="secondary-image"
                    src={product.gallaryImages[0]}
                    alt="Secondary image"
                    width={1080}
                    height={720}
                    style={{ width: "100%", height: "auto" }}
                  />
                </ImageContainer>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "black" }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575", marginBottom: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="h6" sx={{ color: "#ff5722", fontWeight: "bold" }}>
                  ₹ {product.totalPrice}
                </Typography>
              </Link>
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
                onClick={() => addToCart(product)}
              >
                Buy Now
              </Button>
            </Item>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export { NewArrival };
