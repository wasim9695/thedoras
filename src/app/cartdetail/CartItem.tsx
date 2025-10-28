import React, { useEffect, useCallback } from 'react';
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
import Link from 'next/link';

interface CartItemProps {
  cartId: number;
  productImage: string;
  productId: number;
  name: string;
  colorname: string;
  sizename: string;
  totalPrice: number;
  quantity: number;
  onRemove: (cartId: number, productId: number) => void;
  onQuantityChange: (cartId: number, newQuantity: number) => void;
}



const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
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
  const router = useRouter();
  // const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  const updateCarts = async (productId: number, cartId: number, quantity: number) => {
    const dataResponse = [{
      "productId": productId,
      "quantity": quantity,
      "_id": cartId,
    }];
    try {
      const res = await fetchSingleUpdate(dataResponse);
      console.log('Update response:', res);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

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
          // setCartItems([]);
          return;
        }

        // const formattedItems: CartItemProps[] = cartItems.map((item) => ({
        //   productId: Number(item.productId),
        //   name: item.name,
        //   cartId: item.cartId,
        //   productImage: item.productImage,
        //   totalPrice: Number(item.totalPrice),
        //   quantity: Number(item.quantity),
        //   sizename: item.sizename || 'N/A',
        //   colorname: item.colorname || 'N/A',
        //   onRemove: () => {}, // Provide default function
        //   onQuantityChange: () => {}, // Provide default function
        // }));

        // setCartItems(formattedItems);
      } else {
        // setCartItems([]);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      // setCartItems([]);
    }
  }, [router]);

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      onQuantityChange(cartId, newQuantity);
      console.log(cartId, newQuantity, productId);
      updateCarts(productId, cartId, newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    onQuantityChange(cartId, newQuantity);
    console.log(newQuantity);
    updateCarts(productId, cartId, newQuantity);
  };

  const handleQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(cartId, newQuantity);
      updateCarts(productId, cartId, newQuantity);
    } else {
      console.error("Invalid quantity input");
    }
  };

  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.totalPrice * item.quantity,
  //   0
  // );

  // Removed unused calculateTotal function since it wasn't being used

  useEffect(() => {
    getCarts();
  }, [getCarts]); // Added getCarts to dependency array

  return (
    <StyledCard>
      <Link href={`/productdetail/${productId}`}>
        <StyledCardMedia image={productImage} title={name} />
      </Link>
      <CardContent sx={{ flex: '1 1 auto', padding: 2 }}>
        <Typography component="h3" variant="h6" color="text.primary" fontWeight="semibold">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Color: {colorname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {sizename}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
          <IconButton aria-label="remove" size="small" onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>

          <TextField
            size="small"
            type="number"
            value={quantity}
            onChange={handleQuantityInputChange}
            inputProps={{ 
              min: 1, 
              style: { textAlign: 'center', width: '40px' } 
            }}
          />

          <IconButton aria-label="add" size="small" onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" color="text.primary" fontWeight="semibold">
          (INR) ₹{totalPrice.toLocaleString()}
        </Typography>
      </CardContent>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        padding: 1 
      }}>
        <IconButton 
          aria-label="delete" 
          onClick={() => onRemove(cartId, productId)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </StyledCard>
  );
};

export default CartItem;