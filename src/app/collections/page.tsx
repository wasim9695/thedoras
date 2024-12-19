"use client"
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Checkbox, FormControlLabel, Button, Divider } from '@mui/material';

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
            sx={{ marginTop: '20px' }}
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
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      ${product.price}
                    </Typography>
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