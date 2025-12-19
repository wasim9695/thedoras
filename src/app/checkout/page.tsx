"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { fetchGetFetchDetails, aaddNewAddressHere } from "../api/profileAuth/allProfileDetails";

// ---------------- Interfaces ----------------
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

// ---------------- Styled Components ----------------
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

// ---------------- Main Component ----------------
const CheckoutPage = () => {
  // const [selectedState, setSelectedState] = useState("");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  // const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    zip: "",
    country: "India",
    state: "",
    city: "",
  });
  const router = useRouter();

  // ---------- Fetch Functions ----------
  const getCarts = useCallback(async () => {
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

        const formattedItems: CartItemType[] = cartItems.map((item: Record<string, unknown>) => ({
          productId: Number(item.productId) || 0,
          name: (item.name as string) || "",
          cartId: Number(item.cartId) || 0,
          productImage: (item.productImage as string) || "",
          totalPrice: Number(item.totalPrice) || 0,
          quantity: Number(item.quantity) || 0,
          sizename: (item.sizename as string) || "N/A",
          colorname: (item.colorname as string) || "N/A",
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
  }, [router]);

  const getAddresses = useCallback(async () => {
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
          new Map(response.map((item) => [item.addressId, item])).values()
        );

        const formattedAddresses: AddressType[] = uniqueAddresses.map((item) => ({
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

        setAddresses(formattedAddresses);

        if (response.length !== uniqueAddresses.length) {
          setError("Duplicate addresses detected. Only unique addresses are displayed.");
        }

        if (formattedAddresses.length > 0) {
          // setSelectedAddressId(formattedAddresses[0].addressId);
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
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name as string]: value }));
  };

  const generateObjectId = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  return timestamp + '62c19a52066bc64ea927'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};


 const handleSaveAddress = async () => {
  try {
    const autoGeneratedId = generateObjectId();

    const formattedData: AddressType = {
      name: `${newAddress.firstName} ${newAddress.lastName}`,
      addressLine1: newAddress.address1,
      addressLine2: newAddress.address2,
      city: newAddress.city,
      GST: "", // optional
      zipCode: newAddress.zip,
      mobileNo: newAddress.phone,
      emailId: newAddress.email,
      country: newAddress.country,
      addressId: autoGeneratedId,
    };

    // ✅ WRAP ADDRESS OBJECT
    const payload = {
      address: formattedData,
    };

    const response = await aaddNewAddressHere(payload);

   
      await getAddresses(); // refresh address list

      // clear form
      setNewAddress({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address1: "",
        address2: "",
        zip: "",
        country: "India",
        state: "",
        city: "",
      });
   
  } catch (err) {
    console.error(err);
    setError("Error saving address.");
  }
};



  // ---------- useEffect ----------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([getCarts(), getAddresses()]);
      setLoading(false);
    };
    fetchData();
  }, [getCarts, getAddresses]);

  // ---------- Event Handlers ----------
  // const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setSelectedState(event.target.value as string);
  // };

  const handleAddressChange = () => {
    // setSelectedAddressId(event.target.value);
  };

  const paymentPage = () => {
    router.push("/payment");
  };

  // ---------- Derived Values ----------
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const total = subtotal;
  const formStyles = { spacing: 3, elevation: 3, padding: 3 };

  // ---------- JSX ----------
  return (
    <Container maxWidth="xl" sx={{ mt: 6, mb: 6 }}>
      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />}
      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Cart &gt; Address &gt; Payment
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Shipping Address */}
        <Grid item xs={12} md={6}>
          <Card elevation={formStyles.elevation}>
            <CardContent sx={{ p: formStyles.padding }}>
              <Typography variant="h6" gutterBottom>Shipping Address</Typography>

              {addresses.length > 0 ? (
                <FormControl component="fieldset" fullWidth>
                  <FormLabel>Select an Address</FormLabel>
                  <RadioGroup onChange={handleAddressChange} name="selectedAddress">
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

              {/* Add New Address Form */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1">Add New Address</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField name="firstName" label="First Name" fullWidth value={newAddress.firstName} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="lastName" label="Last Name" fullWidth value={newAddress.lastName} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="phone" label="Phone" fullWidth value={newAddress.phone} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="email" label="Email" fullWidth value={newAddress.email} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="address1" label="Address Line 1" fullWidth value={newAddress.address1} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="zip" label="PIN Code" fullWidth value={newAddress.zip} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select name="state" value={newAddress.state} onChange={(e) => handleInputChange(e as any)}>
                        {INDIA_STATES.map((state) => (
                          <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField name="city" label="City" fullWidth value={newAddress.city} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledButton variant="contained" onClick={handleSaveAddress}>
                      Save Address
                    </StyledButton>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <Card elevation={formStyles.elevation}>
            <CardContent sx={{ p: formStyles.padding }}>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
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
                      <Typography variant="body2">₹{(item.totalPrice * item.quantity).toFixed(2)}</Typography>
                    </ListItem>
                  ))
                ) : (
                  <ListItem><ListItemText primary="No items in cart" /></ListItem>
                )}
                <Divider sx={{ my: 3 }} />
                <ListItem>
                  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                    <TextField id="promoCode" label="Promo Code" variant="outlined" size="medium" fullWidth />
                    <StyledButton variant="contained">Apply</StyledButton>
                  </Box>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Subtotal" />
                  <Typography variant="subtitle1" fontWeight="bold">₹{subtotal.toFixed(2)}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" fontWeight="bold">₹{total.toFixed(2)}</Typography>
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
