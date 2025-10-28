"use client";

import React, { useEffect, useState, useCallback } from 'react';
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
import { fetchCartsAll, fetchDeletes } from '../api/products/productsAll';

interface CartItemType {
  cartId: number;
  productImage: string;
  productId: number;
  name: string;
  colorname: string;
  sizename: string;
  totalPrice: number;
  quantity: number;
}



interface DeleteCartRequest {
  productId: number;
  cartId: number;
}

const CartDetails: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const getCarts = useCallback(async () => {
    try {
      const response = await fetchCartsAll();
      if (!localStorage.getItem('authToken') || response.status !== 1) {
        router.push('/signin');
        return;
      }
      console.log('Fetched cart data:', response);

      if (response.status === 1 && response.data?.cartDetails?.length > 0) {
        const { cartItems } = response.data.cartDetails[0];

        if (!Array.isArray(cartItems)) {
          console.error('cartItems is not an array:', cartItems);
          setCartItems([]);
          return;
        }

        const formattedItems: CartItemType[] = cartItems.map((item) => ({
          productId: Number(item.productId),
          name: item.name,
          cartId: item.cartId,
          productImage: item.productImage,
          totalPrice: Number(item.totalPrice),
          quantity: Number(item.quantity),
          sizename: item.sizename || 'N/A',
          colorname: item.colorname || 'N/A',
        }));

        setCartItems(formattedItems);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartItems([]);
    }
  }, [router]);

  const deleteCarts = async (productId: number, cartId: number) => {
    const dataResponse: DeleteCartRequest = {
      productId: productId,
      cartId: cartId,
    };
    try {
      const res = await fetchDeletes(dataResponse);
      console.log('Delete response:', res);
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleRemoveFromCart = (cartId: number, productId: number) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
    console.log(cartId, productId);
    deleteCarts(productId, cartId);
  };

  const handleQuantityChange = (cartId: number, newQuantity: number) => {
    console.log(cartId, newQuantity);
    setCartItems(
      cartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0
  );
  const total = subtotal;

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
  }));

  const checkOuts = () => {
    router.push('/checkout');
  };

  useEffect(() => {
    getCarts();
  }, [getCarts]); // Added getCarts to dependency array

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        color="text.primary" 
        fontWeight="semibold"
      >
        CART
      </Typography>
      <Typography 
        variant="subtitle1" 
        align="center" 
        color="text.secondary" 
        gutterBottom
      >
        {cartItems.length} PRODUCTS
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: '3' }}>
          {cartItems.map((item) => (
            <CartItem
              key={`${item.cartId}-${item.productId}`} // Added unique key
              productImage={item.productImage}
              productId={item.productId}
              name={item.name}
              colorname={item.colorname}
              sizename={item.sizename}
              totalPrice={item.totalPrice}
              quantity={item.quantity}
              onRemove={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange} 
              cartId={item.cartId}            
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
            <Button 
              onClick={checkOuts} 
              variant="contained" 
              fullWidth 
              sx={{ bgcolor: 'black' }}
            >
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