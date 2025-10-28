"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Container,
  Paper,
  Pagination
} from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import ShoppingCart, { ShoppingCartHandle } from "../components/shoppingcart";
import Link from "next/link";
import { fetchGetAllProducts } from "../api/bannerAll/banners";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ImageContainer = styled("div")({
  position: "relative",
  width: "100%",
  paddingTop: "120%",
  "& .product-image": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "4px",
    transition: "opacity 0.3s ease-in-out",
  },
  "& .primary-image": { zIndex: 1 },
  "& .secondary-image": { opacity: 0 },
  "&:hover .primary-image": { opacity: 0 },
  "&:hover .secondary-image": { opacity: 1 },
});

const backgroundImg = "/offerimages.jpg";

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


const Collection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const cartRef = useRef<ShoppingCartHandle>(null);

  const addToCart = async (product: Product): Promise<void> => {
    try {
      cartRef.current?.handleAddToCart(product);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetchGetAllProducts();
      if (response?.data?.length > 0) {
        const parsedData: Product[] = response.data.map(
          (product: Record<string, unknown>) => ({
            ...product,
            gallaryImages:
              typeof product.gallaryImages === "string"
                ? JSON.parse(product.gallaryImages as string)
                : (product.gallaryImages as string[]) || [],
          })
        ) as Product[];
        setListProducts(parsedData);
      } else {
        setListProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setListProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(listProducts.length / itemsPerPage);
  const paginatedProducts = listProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            py: 6,
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.7,
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#fff", mb: 2 }}
            >
              India Price The Dora
            </Typography>
            <ShoppingCart ref={cartRef} />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Products */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {paginatedProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Item>
                    <Link href={`/productdetail/${product._id}`}>
                      <ImageContainer>
                        <Image
                          className="product-image primary-image"
                          src={
                            product?.productImage ||
                            "https://sakshigirri.com/cdn/shop/files/default_720x.jpg"
                          }
                          alt="Primary image"
                          fill
                        />
                        <Image
                          className="product-image secondary-image"
                          src={
                            product?.gallaryImages?.[1] ||
                            "https://sakshigirri.com/cdn/shop/files/3.3_540x.jpg"
                          }
                          alt="Secondary image"
                          fill
                        />
                      </ImageContainer>
                      <Typography
                        variant="h6"
                        sx={{ mt: 2, fontWeight: "bold", color: "#333" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "#ff5722", fontWeight: "bold" }}
                      >
                        ₹{product.totalPrice}
                      </Typography>
                    </Link>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        fontWeight: "bold",
                        padding: "8px 16px",
                        background:
                          "linear-gradient(45deg, #000000 30%, #333333 90%)",
                      }}
                      onClick={() => addToCart(product)}
                    >
                      Buy Now
                    </Button>
                  </Item>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, p) => setCurrentPage(p)}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Collection;
