"use client"
import React, { useState, useEffect, useCallback } from "react";
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
import { fetchCartsAll , placeorders} from "../api/products/productsAll";
import { fetchGetFetchDetails, aaddNewAddressHere, setAddAddressDefoult } from "../api/profileAuth/allProfileDetails";
import { useRouter } from "next/navigation";

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
  defaultAddress?: boolean;
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


const PaymentPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
     const [loading, setLoading] = useState(true);
     const [userID, setUserID] = useState<string | null>(null);
      const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [promoCode, setPromoCode] = useState("");

  // const cartItems = [
  //   {
  //     id: 1,
  //     name: "Mijwan Black Thread Embroidered Bandhgala Set",
  //     size: "Custom Size",
  //     color: "Black",
  //     price: 182000,
  //   },
  //   {
  //     id: 2,
  //     name: "Mijwan Chikankari Ivory Grid Sherwani Set",
  //     size: "Custom Size",
  //     color: "Ivory",
  //     price: 480000,
  //   },
  // ];

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
          defaultAddress: item.defaultAddress || false,
        }));
   console.log(formattedAddresses);
   formattedAddresses.forEach(element => {
      if(element.defaultAddress){
        console.log("default address",element);
         setAddresses([element]);
      }
   });
        // setAddresses(formattedAddresses);

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


// ---------- New Order Placement Logic ----------
  const handlePlaceOrder = async () => {
    // 1. Get the shipping address (using the first one as default if not specified)
    const selectedAddress = addresses[0]; 

    if (!selectedAddress) {
      alert("No shipping address found. Please add an address first.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // setIsPlacingOrder(true);

    // 2. Map data to match your MySQL Schema
    const orderData = {
      orderId: `ORD-${Date.now()}`, // Generates a unique ID based on timestamp
      userId: userID, // Replace with your actual logged-in User ID
      totalAmount: cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0),
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
      shippingAddress: `${selectedAddress.addressLine1}, ${selectedAddress.addressLine2}`,
      shippingCity: selectedAddress.city,
      shippingZipcode: selectedAddress.zipCode,
      shippingCountry: selectedAddress.country,
      orderStatus: "pending",
      discount: 0,
      deliveryCharges: 0,
      // Sending product array for your backend bulk insert
      products: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        productImage: item.productImage,
        sizename: item.sizename,
        colorname: item.colorname,
        quantity: item.quantity,
        price: item.totalPrice
      })),
    };

    try {
      // 3. Call your API
      console.log( "Placing order with data:", orderData);
      // return;
      const response = await placeorders(orderData);
      console.log("Order placement response:", response);

      if (response.status === 1) {
        alert("Success! Your order has been placed.");
        // router.push("/order-success"); // Redirect to success page
      } else {
        alert("Failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong while placing the order.");
    } finally {
      // setIsPlacingOrder(false);
    }
  };




  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
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

  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        await Promise.all([getCarts(), getAddresses()]);
        setLoading(false);
      };
      fetchData();
      setUserID(localStorage.getItem("userID"));
    }, [getCarts, getAddresses]);

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
                <ListItem key={item.cartId} sx={{ py: 2 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="medium">
                        {item.name}
                      </Typography>
                    }
                    secondary={`Size: ${item.sizename}, Color: ${item.colorname}, Qty: ${item.quantity}`}
                  />
                  <Typography variant="body1" fontWeight="medium">
                    ₹{(item.totalPrice * item.quantity).toFixed(2)}
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
              onClick={handlePlaceOrder}
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