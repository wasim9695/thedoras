// CartDetails.tsx
"use client";

import React, { useState } from 'react';
import CartItem from './CartItem';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

interface CartItemType {
  id: string;
  imageUrl: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

const CartDetails: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: '1',
      imageUrl:
        'https://sakshigirri.com/cdn/shop/files/0N5A7016_s_1080x.jpg?v=1735279856',
      name: 'MIJWAN BLACK THREAD EMBROIDERED BANDHGALA SET',
      color: 'Black',
      size: 'CUSTOM SIZE',
      price: 182000,
      quantity: 1,
    },
    {
      id: '2',
      imageUrl:
        'https://sakshigirri.com/cdn/shop/files/0N5A7016_s_1080x.jpg?v=1735279856',
      name: 'MIJWAN CHIKANKARI IVORY GRID SHERWANI SET',
      color: 'Ivory',
      size: 'CUSTOM SIZE',
      price: 480000,
      quantity: 1,
    },
  ]);

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal; // In this example, total is same as subtotal

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
  }));

  const checkOuts = () =>{
    router.push('/checkout');
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom color="text.primary" fontWeight="semibold">
        CART
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
        {cartItems.length} PRODUCTS
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: '3' }}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              color={item.color}
              size={item.size}
              price={item.price}
              quantity={item.quantity}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </Box>
        <Box sx={{ flex: '2' }}>
          <StyledPaper elevation={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" color="text.primary">
                SUBTOTAL:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                (INR) ₹{subtotal.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" color="text.primary">
                TOTAL:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                (INR) ₹{total.toLocaleString()}
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Apply coupon"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            <Button variant="contained" fullWidth sx={{ mb: 3, bgcolor: 'black' }}>
              Apply
            </Button>
            <Button onClick={checkOuts} variant="contained" fullWidth sx={{ bgcolor: 'black' }}>
              CHECKOUT
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              *Please note: Final shipping charges will be calculated and displayed after you
              provide your delivery address during checkout.
            </Typography>
          </StyledPaper>
        </Box>
      </Box>
    </Container>
  );
};

export default CartDetails;
