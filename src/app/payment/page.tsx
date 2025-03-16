"use client"
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardProps, // Import CardProps
} from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";

// Define a custom interface for PaymentMethodCard props
interface PaymentMethodCardProps extends CardProps {
  selected?: boolean; // Add the selected prop
}

// Styled Components
const PaymentMethodCard = styled(Card)<PaymentMethodCardProps>(({ theme, selected }) => ({
  border: selected ? `2px solid` : "1px solid #e0e0e0",
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
}));

// Rest of your code remains the same...
const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: 4,
}));

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [promoCode, setPromoCode] = useState("");

  const cartItems = [
    {
      id: 1,
      name: "Mijwan Black Thread Embroidered Bandhgala Set",
      size: "Custom Size",
      color: "Black",
      price: 182000,
    },
    {
      id: 2,
      name: "Mijwan Chikankari Ivory Grid Sherwani Set",
      size: "Custom Size",
      color: "Ivory",
      price: 480000,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal;

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handlePromoCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handleApplyPromoCode = () => {
    alert("Promo code applied (not implemented)");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Payment
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Payment Method
          </Typography>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              aria-label="payment-method"
              name="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <PaymentMethodCard selected={paymentMethod === "online"}>
                <CardContent>
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          Pay Online
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pay via PayPal, Razorpay, Debit Card, Credit Card, UPI & Net Banking
                        </Typography>
                      </Box>
                    }
                  />
                </CardContent>
              </PaymentMethodCard>

              <PaymentMethodCard selected={paymentMethod === "cod"}>
                <CardContent>
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          Cash on Delivery
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pay with cash when your order is delivered
                        </Typography>
                      </Box>
                    }
                  />
                </CardContent>
              </PaymentMethodCard>
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <Button component={Link} href="/checkout" variant="outlined" color="primary">
              Back to Address
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Order Summary
            </Typography>

            <List disablePadding>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ py: 2 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="medium">
                        {item.name}
                      </Typography>
                    }
                    secondary={`Size: ${item.size}, Color: ${item.color}`}
                  />
                  <Typography variant="body1" fontWeight="medium">
                    ₹{item.price.toLocaleString()}
                  </Typography>
                </ListItem>
              ))}

              <Divider sx={{ my: 2 }} />

              <ListItem sx={{ py: 2 }}>
                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                  <TextField
                    label="Promo Code"
                    variant="outlined"
                    size="medium"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    fullWidth
                  />
                  <StyledButton variant="outlined" color="primary" onClick={handleApplyPromoCode}>
                    Apply
                  </StyledButton>
                </Box>
              </ListItem>

              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Subtotal" />
                <Typography variant="subtitle1" fontWeight="medium">
                  ₹{subtotal.toLocaleString()}
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary="Total" />
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ₹{total.toLocaleString()}
                </Typography>
              </ListItem>
            </List>

            <StyledButton
              variant="contained"
              style={{ background: "#000000" }}
              fullWidth
              sx={{ mt: 3 }}
              disabled={!paymentMethod}
            >
              {paymentMethod === "cod" ? "Place Order (COD)" : "Proceed to Payment"}
            </StyledButton>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;