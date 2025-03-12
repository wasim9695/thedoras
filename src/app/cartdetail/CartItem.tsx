// CartItem.tsx
import React from 'react';
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

interface CartItemProps {
  id: string;
  imageUrl: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
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
  id,
  imageUrl,
  name,
  color,
  size,
  price,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleQuantityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(id, newQuantity);
    } else {
      // Handle invalid input (e.g., show an error message)
      console.error("Invalid quantity input");
    }
  };

  return (
    <StyledCard>
      <StyledCardMedia image={imageUrl} title={name} />
      <CardContent sx={{ flex: '1 1 auto', padding: 2 }}>
        <Typography component="h3" variant="h6" color="text.primary" fontWeight="semibold">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Color: {color}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Size: {size}
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
          (INR) ₹{price.toLocaleString()}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: 1}}>
        <IconButton aria-label="delete" onClick={() => onRemove(id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </StyledCard>
  );
};

export default CartItem;
