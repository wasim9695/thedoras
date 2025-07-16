import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Drawer, Button, Box, Typography, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import Image from 'next/image';
import { fetchCartsAll } from '../api/products/productsAll';

interface Product {
    productId: number; // Changed to string to accommodate product._id
    name: string;
    productImage: string;
    totalPrice: number;
    quantity: number;
    size: string;
}

// Define the ref handle interface
export interface ShoppingCartHandle {
  handleAddToCart: (product: Product) => void; // product: any because it comes with _id
}

// No props for this example
interface ShoppingCartProps {}

const ShoppingCart = forwardRef<ShoppingCartHandle, ShoppingCartProps>((props, ref) => {
    const [cartItems, setCartItems] = useState<any[]>([]); // Explicitly type cartItems
    const [isCartOpen, setIsCartOpen] = useState(false);

    useImperativeHandle(ref, () => ({
  handleAddToCart: (product: any) => {
    console.log("Adding to cart:", product, cartItems);
    
    // Find existing item using product._id
    const existingItem = cartItems.find((item: Product) => item.productId === product._id);

    if (existingItem) {
        console.log("exsiting");
      setCartItems(
        cartItems.map((item: Product) =>
          item.productId === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
         console.log("nonexsiting");
      // Add new product to cart
      setCartItems([
        ...cartItems,
        {
          productId: product._id,
          name: product.name,
          productImage: product.image || product.productImage || '',
          totalPrice: product.price || product.totalPrice || 0,
          quantity: 1,
          size: product.size || 'N/A',
        },
      ]);
    }
    
    setIsCartOpen(true); // Open the sidebar
  },
}));

    const handleRemoveFromCart = (id: string) => { // Changed id type to string
        setCartItems(cartItems.filter((item) => item.cartId !== id));
    };

    const handleIncreaseQuantity = (id: string) => { // Changed id type to string
        setCartItems(
            cartItems.map((item) =>
                item.cartId === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id: string) => { // Changed id type to string
        setCartItems(
            cartItems.map((item) =>
                item.cartId === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.totalPrice * item.quantity,
        0
    );

    const calculateTotal = () => {
        return subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

   const getCarts = async () => {
//   setIsLoading(true);
//   setError(null);
  try {
    const response = await fetchCartsAll();
    console.log('Fetched cart data:', response);

    if (response.status === 1 && response.data?.cartDetails?.length > 0) {
      const { cartItems } = response.data.cartDetails[0];

      // Ensure cartItems is an array
      if (!Array.isArray(cartItems)) {
        console.error('cartItems is not an array:', cartItems);
        // setError('Invalid cart data format');
        setCartItems([]);
        return;
      }

      // Map cartItems to Product interface
      const formattedItems: any[] = cartItems.map((item: any) => ({
        productId: item.productId, // Ensure cartId is a string
        name: item.name,
        productImage: item.productImage,
        totalPrice: item.totalPrice,
        quantity: item.quantity,
        size: item.size || 'N/A', // Fallback for missing size
      }));

      setCartItems(formattedItems);
    } else {
      setCartItems([]);
      //setError(response.message || 'No cart items found');
    }
  } catch (err: any) {
    console.error('Error fetching cart:', err);
    //setError(err.message || 'Failed to fetch cart data');
    setCartItems([]);
  } finally {
   // setIsLoading(false);
  }
};

    useEffect(() => {
        getCarts();
        // Consider if you always want the cart to open on mount.
        // If not, remove setIsCartOpen(true); here.
        setIsCartOpen(true); 
    }, []);

    return (
        <div>
            <Drawer
                anchor="right"
                open={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                transitionDuration={500} // Adjust the transition duration
                sx={{
                    "& .MuiDrawer-paper": {
                        transition: "all 0.5s ease-in-out", // Custom transition effect
                        boxSizing: "border-box",
                        width: 400,
                        backgroundColor: "#fff",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                        padding: "16px",
                    },
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            CART
                        </Typography>
                        <IconButton onClick={() => setIsCartOpen(false)} sx={{ alignSelf: 'flex-start' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {cartItems.length === 0 ? (
                        <Typography>Your cart is empty</Typography>
                    ) : (
                        <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
                            {cartItems.map((item) => (
                                <Box
                                    key={item.cartId} // Ensure cartId is unique and consistent
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 2,
                                        padding: "10px",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Image
                                            src={item.productImage}
                                            alt={item.name}
                                            width={200}
                                            height={200}
                                            style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "10px" }}
                                        />
                                        <Box>
                                            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                                {item.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: "12px", color: "#666" }}>
                                                Size: {item.size}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Stack direction="column" alignItems="flex-end" justifyContent="space-between">
                                        <IconButton
                                            sx={{
                                                color: "#000",
                                                "&:hover": {
                                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                                },
                                                alignSelf: "flex-end",
                                            }}
                                            onClick={() => handleRemoveFromCart(item.cartId)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography sx={{ fontSize: "14px", color: "#333", textAlign: "right" }}>
                                            Rs. {item.totalPrice}
                                        </Typography>
                                        <Stack direction="row" alignItems="center" sx={{ mt: 1, border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
                                            <IconButton
                                                sx={{
                                                    padding: "5px",
                                                    borderRadius: 0,
                                                    "&:hover": {
                                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                                    },
                                                    minWidth: "30px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRight: '1px solid #ddd', // Add border between buttons and quantity
                                                }}
                                                onClick={() => handleDecreaseQuantity(item.cartId)}
                                            >
                                                <RemoveIcon sx={{ fontSize: "1rem" }} />
                                            </IconButton>
                                            <Typography sx={{ margin: "0 10px", borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd', padding: '0 5px' }}>{item.quantity}</Typography>
                                            <IconButton
                                                sx={{
                                                    padding: "5px",
                                                    borderRadius: 0,
                                                    "&:hover": {
                                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                                    },
                                                    minWidth: "30px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderLeft: '1px solid #ddd', // Add border between buttons and quantity
                                                }}
                                                onClick={() => handleIncreaseQuantity(item.cartId)}
                                            >
                                                <AddIcon sx={{ fontSize: "1rem" }} />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                </Box>
                            ))}
                        </Box>
                    )}

                    <Box sx={{ padding: "16px", borderTop: "1px solid #ddd" }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>
                            SUBTOTAL
                        </Typography>
                        <Typography sx={{ fontSize: "18px", marginBottom: "10px" }}>
                            Rs. {calculateTotal()}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
                            Shipping, taxes, and discount codes calculated at checkout.
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#000",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#333",
                                },
                            }}
                        >
                            CHECK OUT
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </div>
   );
});

export default ShoppingCart;
