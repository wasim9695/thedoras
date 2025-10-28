"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Select,
  MenuItem,
  Slider,
  Container,
  Paper,
  Breadcrumbs,
  Pagination,
  Stack,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import ShoppingCart, { ShoppingCartHandle } from "../../components/shoppingcart";
import Link from "next/link";
import { fetchGetAllProducts } from "../../api/bannerAll/banners";
import { useParams } from "next/navigation";

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
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const ImageContainer = styled("div")({
  position: "relative",
  width: "100%",
  paddingTop: "120%", // Aspect ratio 3:2
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
  "& .primary-image": {
    zIndex: 1,
  },
  "& .secondary-image": {
    opacity: 0,
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
}

const ProductListID: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [priceRange, setPriceRange] = useState<number[]>([50, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const cartRef = useRef<ShoppingCartHandle>(null);

  const addToCart = async (product: Product) => {
    try {
      if (cartRef.current) {
        cartRef.current.handleAddToCart(product);
      }
    } catch (err: unknown) {
      console.error("Error adding to cart:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetchGetAllProducts();
      if (response?.data?.length > 0) {
        const parsedData: Product[] = response.data.map((product: Product) => ({
          ...product,
          gallaryImages:
            typeof product.gallaryImages === "string"
              ? JSON.parse(product.gallaryImages)
              : product.gallaryImages || [],
        }));
        setListProducts(parsedData);
      } else {
        setListProducts([]);
      }
    } catch (err: unknown) {
      console.error("Error fetching products:", err);
      setListProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ["All", "Clothing", "Accessories", "Electronics", "Home"];
  const colors = ["Black", "Red", "Green", "Blue", "White"];
  const itemsPerPage = 8;
  const totalPages = Math.ceil(listProducts.length / itemsPerPage);
  const paginatedProducts = listProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
    setCurrentPage(1);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const params = useParams();
  const slug = params.slug as string[];
  const id = slug?.[slug.length - 1];

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, padding: 4, boxSizing: "border-box" }}>
        User ID: {id}
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
              // backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.7,
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#fff", mb: 2, textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
              New Arrivale Products
            </Typography>
            <ShoppingCart ref={cartRef} />
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" sx={{ color: "#fff" }} />}
              aria-label="breadcrumb"
              sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}
            >
              {/* Breadcrumb items if any */}
            </Breadcrumbs>

            <Typography variant="h6" sx={{ color: "#fff", mt: 2, textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
              Special Discounts Available!
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <Paper elevation={3} sx={{ p: 1.5, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", borderRadius: "8px" }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
                Categories
              </Typography>
              <Stack spacing={0.5}>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={<Checkbox checked={selectedFilters.includes(category)} onChange={() => handleFilterChange(category)} size="small" />}
                    label={<Typography variant="body2">{category}</Typography>}
                  />
                ))}
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
                Color
              </Typography>
              <Stack spacing={0.5}>
                {colors.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={<Checkbox checked={selectedFilters.includes(color)} onChange={() => handleFilterChange(color)} size="small" />}
                    label={<Typography variant="body2">{color}</Typography>}
                  />
                ))}
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold" }}>
                Price Range
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider value={priceRange} onChange={handlePriceChange} valueLabelDisplay="auto" min={0} max={1000} step={10} size="small" />
                <Typography variant="caption">${priceRange[0]} - ${priceRange[1]}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={10}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                sx={{ minWidth: 200, background: "#fff", borderRadius: "4px" }}
              >
                <MenuItem value="default">Default Sorting</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="name">Name: A-Z</MenuItem>
              </Select>
            </Box>

            <Grid container spacing={2}>
              {paginatedProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={product._id ?? index}>
                  <Item className="product-item">
                    <Link href={`/productdetail/${product._id}`}>
                      <ImageContainer>
                        <Image
                          className="product-image primary-image"
                          src={product.productImage || "https://sakshigirri.com/cdn/shop/files/5_cc7f7567-7ffd-4935-ad06-5c31742ee3d5_720x.jpg"}
                          alt="Primary image"
                          fill
                        />
                        <Image
                          className="product-image secondary-image"
                          src={product.gallaryImages?.[1] || "https://sakshigirri.com/cdn/shop/files/3.3_540x.jpg"}
                          alt="Secondary image"
                          fill
                        />
                      </ImageContainer>
                      <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#333" }}>
                        {product.name || "Product Title"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666", marginBottom: 1 }}>
                        {product.description || "Short description of the product goes here."}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#ff5722", fontWeight: "bold" }}>
                        ₹{product.totalPrice ?? "99.99"}
                      </Typography>
                    </Link>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        fontWeight: "bold",
                        padding: "8px 16px",
                        background: "linear-gradient(45deg, #000000 30%, #333333 90%)",
                        borderRadius: "20px",
                        color: "white",
                        "&:hover": {
                          background: "linear-gradient(45deg, #000000 30%, #333333 90%)",
                        },
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
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductListID;
