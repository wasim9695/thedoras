"use client"
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Checkbox, FormControlLabel, Button, Divider, 
  Skeleton } from '@mui/material';
  import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const products: Product[] = [
    { id: 1, name: 'Product 1', description: 'This is product 1.', image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-6.png&w=384&q=100', price: 100 },
    { id: 2, name: 'Product 2', description: 'This is product 2.', image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-6.png&w=384&q=100', price: 200 },
    { id: 3, name: 'Product 3', description: 'This is product 3.', image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-6.png&w=384&q=100', price: 300 },
    { id: 4, name: 'Product 4', description: 'This is product 3.', image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-6.png&w=384&q=100', price: 300 },
    { id: 5, name: 'Product 5', description: 'This is product 3.', image: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-6.png&w=384&q=100', price: 300 },
  ];
  
  const filters = ['Under $150', '$150 - $300', 'Above $300'];
  

const collection : React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
    const handleFilterChange = (filter: string) => {
      setSelectedFilters((prev) =>
        prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
      );
    };
  
    return (
      <Box className="productList" sx={{ display: 'flex', padding: '20px' }}>
        {/* Sidebar Filter */}
        <Box sx={{ width: '30%', paddingRight: '20px', order: "1px solid #dddddd", // Border starts after padding
           boxSizing: "border-box",  }}>
            <Typography variant="h6">
            Home/Collection
          </Typography>
          <Typography className='headingProduct' variant="h3" gutterBottom>
            Filters
          </Typography>
          <Divider />
          {filters.map((filter) => (
            <FormControlLabel
              key={filter}
              control={
                <Checkbox
                  checked={selectedFilters.includes(filter)}
                  onChange={() => handleFilterChange(filter)}
                />
              }
              label={filter}
            />
          ))}
          <Button
            variant="contained"
            fullWidth
            onClick={() => setSelectedFilters([])}
            style={{ marginTop: '20px', color: '#ffffff',
              backgroundColor:"#D4AF37" }}
          >
            Clear Filters
          </Button>
        </Box>
  
        {/* Product List */}
        <Box sx={{ flexGrow: 1 }}>
        <Typography className='headingProduct' variant="h3" gutterBottom>
            Product List
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card>
                  
                <Box sx={{ position: 'relative', height: 250, width: '100%' }}>
                  {/* Skeleton Placeholder */}
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: 250,
                      width: '100%',
                      display: 'block',
                    }}
                  />
                  {/* Next.js Image with lazy loading */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    style={{ display: 'block' }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center', padding: '16px' }}>
  {/* Product Name */}
  <Typography
    variant="h6"
    sx={{
      color: '#D4AF37',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      marginBottom: '8px',
    }}
  >
    {product.name}
  </Typography>

  {/* Product Description */}
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ fontSize: '0.9rem', marginBottom: '16px' }}
  >
    {product.description}
  </Typography>

  {/* Product Price Section */}
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
    }}
  >
    {/* Crossed Original Price */}
    <Typography
      variant="body2"
      sx={{
        textDecoration: 'line-through',
        color: 'gray',
        fontSize: '0.9rem',
      }}
    >
      ${product.price + 50}
    </Typography>

    {/* Highlighted Discounted Price */}
    <Typography
      variant="body1"
      sx={{
        color: '#FF5722',
        fontWeight: 'bold',
        fontSize: '1.2rem',
      }}
    >
      ${product.price}
    </Typography>
  </Box>

  {/* Add to Cart Button */}
  <Button
    variant="contained"
    size="small"
    sx={{
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: '20px',
      paddingX: '16px',
      color: '#ffffff',
      backgroundColor:"#D4AF37"
    }}
    
  >
    Add to Cart
  </Button>
</CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  };
  export default collection;