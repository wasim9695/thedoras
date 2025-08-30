"use client";

import React, { useState, useEffect } from "react";
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
  FormLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { fetchCartsAll } from "../api/products/productsAll";
import { fetchGetFetchDetails } from "../api/profileAuth/allProfileDetails";

interface AddressType {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  GST: string;
  zipCode: string;
  mobileNo: string;
  emailId: string;
  country: string;
  addressId: string;
}

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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#000000",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#666666",
  },
  padding: theme.spacing(1.5, 4),
}));

const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const CheckoutPage = () => {
  const [selectedState, setSelectedState] = useState("");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedWidthId, setSelectedAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([getCarts(), getAddresses()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getCarts = async () => {
    try {
      const response = await fetchCartsAll();
      if (!localStorage.getItem("authToken") || response.status !== 1) {
        router.push("/signin");
        return;
      }
      if (response.status === 1 && response.data?.cartDetails?.length > 0) {
        const { cartItems } = response.data.cartDetails[0];
        if (!Array.isArray(cartItems)) {
          console.error("cartItems is not an array:", cartItems);
          setCartItems([]);
          return;
        }
        const formattedItems: CartItemType[] = cartItems.map((item: any) => ({
          productId: Number(item.productId) || 0,
          name: item.name || "",
          cartId: item.cartId || 0,
          productImage: item.productImage || "",
          totalPrice: Number(item.totalPrice) || 0,
          quantity: Number(item.quantity) || 0,
          sizename: item.sizename || "N/A",
          colorname: item.colorname || "N/A",
        }));
        setCartItems(formattedItems);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load cart items. Please try again.");
      setCartItems([]);
    }
  };

  const getAddresses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/signin");
        return;
      }
      const response = await fetchGetFetchDetails();
      console.log("Fetched addresses response:", response);
      if (Array.isArray(response)) {
        // Remove duplicates based on addressId
        const uniqueAddresses = Array.from(
          new Map(response.map((item: any) => [item.addressId, item])).values()
        );
        const addresses: AddressType[] = uniqueAddresses.map((item: any) => ({
          name: item.name || "",
          addressLine1: item.addressLine1 || "",
          addressLine2: item.addressLine2 || "",
          city: item.city || "",
          GST: item.GST || "",
          zipCode: item.zipCode || "",
          mobileNo: item.mobileNo || "",
          emailId: item.emailId || "",
          country: item.country || "",
          addressId: item.addressId || "",
        }));
        setAddresses(addresses);
        if (response.length !== uniqueAddresses.length) {
          setError("Duplicate addresses detected. Only unique addresses are displayed.");
        }
        if (addresses.length > 0) {
          setSelectedAddressId(addresses[0].addressId);
        }
      } else {
        console.error("Invalid address response:", response);
        setError("Failed to load addresses. Please add a new address.");
        setAddresses([]);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Failed to load addresses. Please try again.");
      setAddresses([]);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const total = subtotal;

  const handleStateChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedState(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddressId(event.target.value);
  };

  const paymentPage = () => {
    router.push('/payment');
    // if (!selectedAddressId || !addresses.find((addr) => addr.addressId === selectedAddressId)) {
    //   setError("Please select a valid shipping address");
    //   return;
    // }
    // router.push(`/payment?addressId=${selectedAddressId}`);
  };

  const formStyles = {
    spacing: 3,
    elevation: 3,
    padding: 3,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Cart &gt; Address &gt; Payment
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={formStyles.elevation}>
            <CardContent sx={{ p: formStyles.padding }}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              {addresses.length > 0 ? (
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Select an Address</FormLabel>
                  <RadioGroup
                  
                    onChange={handleAddressChange}
                    name="selectedAddress"
                  >
                    {addresses.map((address) => (
                      <FormControlLabel
                        key={address.addressId}
                        value={address.addressId}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="body1">{address.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {`${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.zipCode}, ${address.country}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {`Phone: ${address.mobileNo}, Email: ${address.emailId}`}
                            </Typography>
                          </Box>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No saved addresses found. Please add a new address.
                </Typography>
              )}
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Add New Address
                </Typography>
                <Grid container spacing={formStyles.spacing}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      label="First Name"
                      fullWidth
                      autoComplete="given-name"
                      variant="outlined"
                      size="medium"
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="address1"
                      label="Address Line 1"
                      fullWidth
                      autoComplete="shipping address-line1"
                      variant="outlined"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="address2"
                      label="Address Line 2"
                      fullWidth
                      autoComplete="shipping address-line2"
                      variant="outlined"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12}>
                    <StyledButton
                      variant="contained"
                      onClick={() => {
                        alert("Add address functionality to be implemented");
                      }}
                    >
                      Save Address
                    </StyledButton>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={formStyles.elevation}>
            <CardContent sx={{ p: formStyles.padding }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <List disablePadding>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <ListItem key={item.cartId} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={item.productImage} alt={item.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`Size: ${item.sizename}, Color: ${item.colorname}, Quantity: ${item.quantity}`}
                      />
                      <Typography variant="body2">
                        ₹{(item.totalPrice * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No items in cart" />
                  </ListItem>
                )}
                <Divider sx={{ my: 3 }} />
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
                <ListItem>
                  <ListItemText primary="Subtotal" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    ₹{subtotal.toFixed(2)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    ₹{total.toFixed(2)}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <StyledButton onClick={paymentPage} variant="contained">
          Continue to Payment
        </StyledButton>
      </Box>
    </Container>
  );
};

export default CheckoutPage;