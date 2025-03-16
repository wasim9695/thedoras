"use client";

import React, { useState } from 'react';
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
  Stack,
  Paper,
  Breadcrumbs,
  Pagination,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'next/image';
import { styled } from "@mui/material/styles";
import Link from 'next/link';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  position: "relative",
  overflow: "hidden",
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  flex: '1 0 21%', // Ensures 4 items per row
  margin: theme.spacing(1),
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

const img54 = "https://sakshigirri.com/cdn/shop/files/5_cc7f7567-7ffd-4935-ad06-5c31742ee3d5_720x.jpg";
const img55 = "https://sakshigirri.com/cdn/shop/files/3.3_540x.jpg";
const backgroundImg = "/offerimages.jpg";

const Collection: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<number[]>([50, 500]);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['All', 'Clothing', 'Accessories', 'Electronics', 'Home'];
  const colors = ['Black', 'Red', 'Green', 'Blue', 'White'];
  const itemsPerPage = 8; // 8 items per page

  const allProducts = Array(24).fill(null).map((_, index) => ({
    id: index + 1,
    title: "Product Title",
    description: "Short description of the product goes here.",
    price: 99.99,
    primaryImage: img54,
    secondaryImage: img55,
  }));

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = allProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  // Split into two rows of 4
  const firstRow = paginatedProducts.slice(0, 4);
  const secondRow = paginatedProducts.slice(4, 8);

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, padding: 4, boxSizing: "border-box" }}>
        {/* Title Section unchanged */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            py: 6,
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.7,
              zIndex: 0,
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                color: '#fff', 
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              India Price The Dora
            </Typography>
            
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" sx={{ color: '#fff' }} />}
              aria-label="breadcrumb"
              sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
            >
              <Link  color="inherit" href="/" style={{ color: '#fff' }}>
                Home
              </Link>
              <Link  color="inherit" href="/products" style={{ color: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={img54}
                    alt="Breadcrumb image"
                    width={24}
                    height={24}
                    style={{ marginRight: 8 }}
                  />
                  Products
                </Box>
              </Link>
              <Typography sx={{ color: '#fff' }}>Collection</Typography>
            </Breadcrumbs>

            <Typography 
              variant="h6" 
              sx={{ 
                color: '#fff', 
                mt: 2,
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Special Discounts Available!
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Filter Panel unchanged */}
          <Grid item xs={12} md={2}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1.5, 
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                borderRadius: '8px'
              }}
            >
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Categories
              </Typography>
              <Stack spacing={0.5}>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedFilters.includes(category)}
                        onChange={() => handleFilterChange(category)}
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">{category}</Typography>}
                  />
                ))}
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Color
              </Typography>
              <Stack spacing={0.5}>
                {colors.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={
                      <Checkbox
                        checked={selectedFilters.includes(color)}
                        onChange={() => handleFilterChange(color)}
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">{color}</Typography>}
                  />
                ))}
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Price Range
              </Typography>
              <Box sx={{ px: 1 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                  size="small"
                />
                <Typography variant="caption">
                  ${priceRange[0]} - ${priceRange[1]}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Products and Pagination */}
          <Grid item xs={12} md={10}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                sx={{ 
                  minWidth: 200,
                  background: '#fff',
                  borderRadius: '4px'
                }}
              >
                <MenuItem value="default">Default Sorting</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="name">Name: A-Z</MenuItem>
              </Select>
            </Box>

            {/* First Row */}
            <Stack 
              direction="row" 
              spacing={2}
              sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                mb: 2
              }}
            >
              {firstRow.map((product) => (
                <Item className="product-item" key={product.id}>
                  <Link href={"/productdetail"}>
                    <ImageContainer>
                      <Image
                        className="primary-image"
                        src={product.primaryImage}
                        alt="Primary image"
                        width={540}
                        height={360}
                        style={{ width: "100%", height: "auto", borderRadius: '4px' }}
                      />
                      <Image
                        className="secondary-image"
                        src={product.secondaryImage}
                        alt="Secondary image"
                        width={540}
                        height={360}
                        style={{ width: "100%", height: "auto", borderRadius: '4px' }}
                      />
                    </ImageContainer>
                    <Typography 
                      variant="h6" 
                      sx={{ mt: 2, fontWeight: "bold", color: "#333" }}
                    >
                      {product.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: "#666", marginBottom: 1 }}
                    >
                      {product.description}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ color: "#ff5722", fontWeight: "bold" }}
                    >
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        fontWeight: "bold",
                        padding: "8px 16px",
                        background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
                        borderRadius: '20px',
                        color: "white",
                        "&:hover": {
                          background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </Item>
              ))}
            </Stack>

            {/* Second Row */}
            <Stack 
              direction="row" 
              spacing={2}
              sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                mb: 2
              }}
            >
              {secondRow.map((product) => (
                <Item className="product-item" key={product.id}>
                  <Link href="#" >
                    <ImageContainer>
                      <Image
                        className="primary-image"
                        src={product.primaryImage}
                        alt="Primary image"
                        width={540}
                        height={360}
                        style={{ width: "100%", height: "auto", borderRadius: '4px' }}
                      />
                      <Image
                        className="secondary-image"
                        src={product.secondaryImage}
                        alt="Secondary image"
                        width={540}
                        height={360}
                        style={{ width: "100%", height: "auto", borderRadius: '4px' }}
                      />
                    </ImageContainer>
                    <Typography 
                      variant="h6" 
                      sx={{ mt: 2, fontWeight: "bold", color: "#333" }}
                    >
                      {product.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: "#666", marginBottom: 1 }}
                    >
                      {product.description}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ color: "#ff5722", fontWeight: "bold" }}
                    >
                      ${product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        fontWeight: "bold",
                        padding: "8px 16px",
                        background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
                        borderRadius: '20px',
                        color: "white",
                        "&:hover": {
                          background: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </Item>
              ))}
            </Stack>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                style={{color:"#000000"}}
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

export default Collection;