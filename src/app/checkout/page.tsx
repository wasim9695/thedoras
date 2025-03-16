"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from 'next/navigation';

// Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#000000",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#666666",
  },
  padding: theme.spacing(1.5, 4),
}));

// Constants
const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// Main Checkout Component
const CheckoutPage = () => {
  const [selectedState, setSelectedState] = useState("");
  const router = useRouter();

  // Event Handlers
  const handleStateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedState(event.target.value);
  };

  const paymentPage = () =>{
    router.push('/payment');
  }

  // Component Styles Configuration
  const formStyles = {
    spacing: 3,    // Increased spacing between form elements
    elevation: 3,  // Slightly higher elevation for better shadow
    padding: 3,    // Added padding for card content
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        
        <Typography variant="body1" color="text.secondary">
          Cart &gt; Address &gt; Payment
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Shipping Address Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={formStyles.elevation}>
            <CardContent sx={{ p: formStyles.padding }}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              
              {/* Personal Information Fields */}
              <Grid container spacing={formStyles.spacing}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    size="medium"  // Increased from small to medium
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>

                {/* Contact Information Fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phone"
                    label="Phone"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    helperText="For order-related communication"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>

                {/* Address Fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="address1"
                    label="Address"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    label="PIN Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="outlined"
                    size="medium"
                  />
                </Grid>

                {/* Location Fields */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined" size="medium">
                    <InputLabel>Country</InputLabel>
                    <Select value="India" label="Country">
                      <MenuItem value="India">India</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined" size="medium">
                    <InputLabel>State</InputLabel>
                    <Select
                      value={selectedState}
                      onChange={handleStateChange}
                      label="State"
                    >
                      {INDIA_STATES.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    size="medium"
                  />
                </Grid>

                {/* Address Type Selection */}
                <Grid item xs={12}>
                  <FormControl>
                    <RadioGroup row defaultValue="home" name="addressType">
                      <FormControlLabel
                        value="home"
                        control={<Radio />}
                        label="Home"
                      />
                      <FormControlLabel
                        value="office"
                        control={<Radio />}
                        label="Office"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={formStyles.elevation}>
            <CardContent sx={{ p: formStyles.padding }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              {/* Order Items List */}
              <List disablePadding>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://pplx-res.cloudinary.com/image/upload/v1741759921/user_uploads/VvpLXsvPEIspgDh/image.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Mijwan Black Thread Embroidered Bandhgala Set"
                    secondary="Size: CUSTOM SIZE, Color: Black"
                  />
                  <Typography variant="body2">₹1,82,000</Typography>
                </ListItem>

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://pplx-res.cloudinary.com/image/upload/v1741759921/user_uploads/VvpLXsvPEIspgDh/image.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Mijwan Chikan Kari Ivory Grid Sherwani Set"
                    secondary="Size: CUSTOM SIZE, Color: Ivory"
                  />
                  <Typography variant="body2">₹4,80,000</Typography>
                </ListItem>

                <Divider sx={{ my: 3 }} />

                {/* Promo Code Section */}
                <ListItem>
                  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                    <TextField
                      id="promoCode"
                      label="Promo Code"
                      variant="outlined"
                      size="medium"
                      fullWidth
                    />
                    <StyledButton variant="contained">Apply</StyledButton>
                  </Box>
                </ListItem>

                {/* Order Totals */}
                <ListItem>
                  <ListItemText primary="Subtotal" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    ₹6,62,000
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    ₹6,62,000
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer Actions */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <StyledButton onClick={paymentPage} variant="contained">
          Continue to Shipping
        </StyledButton>
      </Box>
    </Container>
  );
};

export default CheckoutPage;