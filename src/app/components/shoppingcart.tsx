import React, { useState } from "react";
import { Drawer, Button, Box, Typography, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
}

const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>([
        {
            id: 1,
            name: "Ivory Botanical Printed Shirt & Chantilly Lace Skirt Set",
            image:
                "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
            price: 13050,
            quantity: 1,
            size: "XS",
        },
        {
            id: 2,
            name: "Off-White Botanical Cropped Blazer & Drawstring Skirt",
            image:
                "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
            price: 15750,
            quantity: 1,
            size: "XS",
        },
    ]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleAddToCart = (product: Product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        setIsCartOpen(true); // Open the sidebar when an item is added
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const handleIncreaseQuantity = (id: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const calculateTotal = () => {
        return subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    return (
        <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            {/* Example Product */}
            <Button
                onClick={() =>
                    handleAddToCart({
                        id: 3,
                        name: "Another Product",
                        image:
                            "https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Finstagram%2F1.jpg&w=384&q=75",
                        price: 12000,
                        quantity: 1,
                        size: "XS",
                    })
                }
                sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    margin: "20px",
                }}
            >
                Add to Cart
            </Button>

            {/* Cart Sidebar with Smooth Animation */}
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
                    </Box>... {cartItems.length === 0 ? (
                        <Typography>Your cart is empty</Typography>
                    ) : (
                        <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
                            {cartItems.map((item) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 2,
                                        padding: "10px",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
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
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography sx={{ fontSize: "14px", color: "#333", textAlign: "right" }}>
                                            Rs. {item.price.toLocaleString()}
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
                                                onClick={() => handleDecreaseQuantity(item.id)}
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
                                                onClick={() => handleIncreaseQuantity(item.id)}
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
};

export default ShoppingCart;
