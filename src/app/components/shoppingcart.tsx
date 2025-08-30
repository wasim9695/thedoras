import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Drawer, Button, Box, Typography, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { fetchCartsAll, fetchAddToCart } from '../api/products/productsAll';
import { useRouter } from 'next/navigation';

// Define interfaces
interface Product {
  productId: number;
  name: string;
  productImage: string;
  totalPrice: number;
  quantity: number;
  size: string;
}

export interface ShoppingCartHandle {
  handleAddToCart: (product: Product) => void;
}

interface ShoppingCartProps {}

const ShoppingCart = forwardRef<ShoppingCartHandle, ShoppingCartProps>((props, ref) => {
const router = useRouter();

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    handleAddToCart: async (product: any) => {
      const response = await fetchCartsAll();
  console.log(response);
        if ((!localStorage.getItem('authToken')) || (response.status !== 1)) {
        router.push('/signin'); // Redirect to sign-in page
        return;
      }
      console.log('Adding to cart:', product);

      // Find existing item using productId
      const existingItem = cartItems.find((item) => item.productId === product._id);

      if (existingItem) {
        console.log("existing");
        const updatedItems = cartItems.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedItems);
        try {
            console.log(product);
          await fetchAddToCart({ productId: product._id, quantity: 1 , attri_size: product.attri_size, attri_color: product.attri_color });
        } catch (error) {
          console.error('Failed to add to cart:', error);
        }
      } else {
        console.log("nonexisting");
        const newItem = {
          productId: product._id,
          name: product.name,
          productImage: product.productImage || '',
          totalPrice: product.totalPrice || 0,
          quantity: 1,
          size: product.size || 'N/A',
        };
        setCartItems([...cartItems, newItem]);
        try {
          await fetchAddToCart(newItem);
        } catch (error) {
          console.error('Failed to add to cart:', error);
        }
      }

      setIsCartOpen(true);
    },
  }));

  const handleRemoveFromCart = async (productId: any) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
    // Optionally add API call to remove item from server
  };

  const handleIncreaseQuantity = async (productId: any) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    try {
      await fetchAddToCart({ productId, quantity: 1 });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (productId: any) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    // Optionally add API call to update quantity on server
  };

  const getCarts = async () => {
    try {
      const response = await fetchCartsAll();
      console.log('Fetched cart data:', response);

      if (response.status === 1 && response.data?.cartDetails?.length > 0) {
        const { cartItems } = response.data.cartDetails[0];

        if (!Array.isArray(cartItems)) {
          console.error('cartItems is not an array:', cartItems);
          setCartItems([]);
          return;
        }

        const formattedItems: any[] = cartItems.map((item: any) => ({
          productId: Number(item.productId),
          name: item.name,
          productImage: item.productImage,
          totalPrice: Number(item.totalPrice),
          quantity: Number(item.quantity),
          size: item.size || 'N/A',
        }));

        setCartItems(formattedItems);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.totalPrice * item.quantity,
    0
  );

  const calculateTotal = () => {
    return subtotal.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      transitionDuration={500}
      sx={{
        '& .MuiDrawer-paper': {
          transition: 'all 0.5s ease-in-out',
          boxSizing: 'border-box',
          width: { xs: '100%', sm: 400 },
          backgroundColor: '#fff',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
          padding: '16px',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            CART
          </Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
            {cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                  p: 1,
                  borderBottom: '1px solid #ddd',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={item.productImage}
                    alt={item.name}
                    width={80}
                    height={80}
                    style={{ objectFit: 'cover' }}
                    onError={() => console.error(`Failed to load image: ${item.productImage}`)}
                  />
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginLeft:'20px' }}>
                      {item.name}
                    </Typography>
                    {/* <Typography sx={{ fontSize: '12px', color: '#666' }}>
                      Size: {item.size}
                    </Typography> */}
                  </Box>
                </Box>
                <Stack direction="column" alignItems="flex-end" justifyContent="space-between">
                  <IconButton
                    sx={{
                      color: '#000',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                    }}
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography sx={{ fontSize: '14px', color: '#333' }}>
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ mt: 1, border: '1px solid #ddd', borderRadius: '5px' }}
                  >
                    <IconButton
                      sx={{
                        p: '5px',
                        borderRadius: 0,
                        minWidth: '30px',
                        height: '30px',
                        borderRight: '1px solid #ddd',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                      }}
                      onClick={() => handleDecreaseQuantity(item.productId)}
                    >
                      <RemoveIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                    <Typography sx={{ mx: 1, px: 1, borderRight: '1px solid #ddd' }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      sx={{
                        p: '5px',
                        borderRadius: 0,
                        minWidth: '30px',
                        height: '30px',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                      }}
                      onClick={() => handleIncreaseQuantity(item.productId)}
                    >
                      <AddIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
        <Box sx={{ p: 2, borderTop: '1px solid #ddd' }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 1 }}>
            SUBTOTAL
          </Typography>
          <Typography sx={{ fontSize: '18px', mb: 1 }}>
            {calculateTotal()}
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#666', mb: 2 }}>
            Shipping, taxes, and discount codes calculated at checkout.
          </Typography>
          <Button onClick={() => router.push('/cartdetail')}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#000',
              color: '#fff',
              py: 1.5,
              borderRadius: '5px',
              '&:hover': { bgcolor: '#333' },
            }}
          >
            CHECK To CART
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
});

ShoppingCart.displayName = 'ShoppingCart';

export default ShoppingCart;