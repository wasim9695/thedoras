// CartItem.tsx
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { fetchCartsAll, fetchSingleUpdate } from '../api/products/productsAll';

interface CartItemProps {
  cartId: number;
  productImage: string;
  productId: number;
  name: string;
  colorname: string;
  sizename: string;
  totalPrice: number;
  quantity: number;
  onRemove: (cartId: any, productId: any) => void;
  onQuantityChange: (cartId: number, newQuantity: number) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Subtle border
}));

const StyledCardMedia = styled(CardMedia)({
  width: 120,
  height: 160,
  objectFit: 'cover',
  marginRight: 16,
});

const CartItem: React.FC<CartItemProps> = ({
  cartId,
  productImage,
  name,
  productId,
  colorname,
  sizename,
  totalPrice,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(cartId, quantity - 1);
      console.log(cartId, quantity, productId);
      updateCarts(productId, cartId , quantity - 1);
    }
  };
const router = useRouter();

const [cartItems, setCartItems] = useState<any[]>([]);

const getCarts = async () => {
    try {
      const response = await fetchCartsAll();
      if ((!localStorage.getItem('authToken')) || (response.status !== 1)) {
        router.push('/signin'); // Redirect to sign-in page
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

        const formattedItems: any[] = cartItems.map((item: any) => ({
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
  };


  const updateCarts = async (productId: number, cartId: number, quantity: number) =>{
    const dataRespons = [{
      "productId":productId,
      "quantity":quantity,
      "_id": cartId,
    }]
    const res = await fetchSingleUpdate(dataRespons);
    try {
      console.log(res);
    } catch (error) {
      console.error('Error updating cart:', error);
      }
  }

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



  const handleIncrement = () => {
    onQuantityChange(cartId, quantity + 1);
   console.log(quantity + 1);
   updateCarts(productId, cartId , quantity + 1)
   
  };

  const handleQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(cartId, newQuantity);
    } else {
      // Handle invalid input (e.g., show an error message)
      console.error("Invalid quantity input");
    }
  };

  return (
    <StyledCard>
      <StyledCardMedia image={ productImage} title={name} />
      <CardContent sx={{ flex: '1 1 auto', padding: 2 }}>
        <Typography component="h3" variant="h6" color="text.primary" fontWeight="semibold">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Color: {colorname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size:  {sizename}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb:1 }}>
          <IconButton aria-label="remove" size="small" onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>

          <TextField
            size="small"
            type="number"
            value={quantity}
            onChange={handleQuantityInputChange}
            inputProps={{ min: 1, style: { textAlign: 'center', width: '40px' } }} // Adjust width as needed
          />

          <IconButton aria-label="add" size="small" onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" color="text.primary" fontWeight="semibold">
          (INR) ₹{totalPrice.toLocaleString()}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: 1}}>
        <IconButton aria-label="delete" onClick={() => onRemove(cartId, productId)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </StyledCard>
  );
};

export default CartItem;
