"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  Drawer,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { fetchCartsAll, fetchAddToCart } from "../api/products/productsAll";
import { useRouter } from "next/navigation";

// ✅ Unified Product interface
interface Product {
  _id: number;
  productId?: number;
  attri_size?: string;
  attri_color?: string;
  name: string;
  productImage: string;
  totalPrice: number;
  quantity?: number;
  size?: string;
}

// ✅ Interface for functions exposed to parent
export interface ShoppingCartHandle {
  handleAddToCart: (product: Product) => Promise<void>;
}

// ✅ Component
const ShoppingCart = forwardRef<ShoppingCartHandle>((_, ref) => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Expose `handleAddToCart` to parent via ref
  useImperativeHandle(ref, () => ({
    handleAddToCart: async (product: Product) => {
      try {
        const response = await fetchCartsAll();
        if (!localStorage.getItem("authToken") || response.status !== 1) {
          router.push("/signin");
          return;
        }

        const productId = product._id || product.productId!;
        const existingItem = cartItems.find((item) => item.productId === productId);

        if (existingItem) {
          const updatedItems = cartItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
          setCartItems(updatedItems);
          await fetchAddToCart({
            productId,
            quantity: 1,
            attri_size: product.attri_size,
            attri_color: product.attri_color,
          });
        } else {
          const newItem: Product = {
            _id: product._id,
            productId,
            name: product.name,
            productImage: product.productImage || "",
            totalPrice: product.totalPrice || 0,
            quantity: 1,
            size: product.size || "N/A",
          };
          setCartItems([...cartItems, newItem]);
          await fetchAddToCart({
            productId,
            quantity: 1,
            attri_size: product.attri_size,
            attri_color: product.attri_color,
          });
        }

        setIsCartOpen(true);
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    },
  }));

  // ✅ Remove from cart
  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  // ✅ Increase quantity
  const handleIncreaseQuantity = async (productId: number) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCartItems(updatedItems);
    try {
      await fetchAddToCart({ productId, quantity: 1 });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // ✅ Decrease quantity
  const handleDecreaseQuantity = (productId: number) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId && (item.quantity || 1) > 1
        ? { ...item, quantity: (item.quantity || 1) - 1 }
        : item
    );
    setCartItems(updatedItems);
  };

  // ✅ Fetch cart items
  const getCarts = async () => {
    try {
      const response = await fetchCartsAll();
      if (response.status === 1 && response.data?.cartDetails?.length > 0) {
        const { cartItems } = response.data.cartDetails[0];
        if (!Array.isArray(cartItems)) {
          setCartItems([]);
          return;
        }

        const formattedItems: Product[] = cartItems.map((item) => ({
          _id: Number(item.productId),
          productId: Number(item.productId),
          name: item.name,
          productImage: item.productImage,
          totalPrice: Number(item.totalPrice),
          quantity: Number(item.quantity),
          size: item.size || "N/A",
        }));

        setCartItems(formattedItems);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.totalPrice * (item.quantity || 1),
    0
  );

  const calculateTotal = () =>
    subtotal.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  // ✅ UI
  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      transitionDuration={500}
      sx={{
        "& .MuiDrawer-paper": {
          transition: "all 0.5s ease-in-out",
          boxSizing: "border-box",
          width: { xs: "100%", sm: 400 },
          backgroundColor: "#fff",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          padding: "16px",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            CART
          </Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
            {cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  p: 1,
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={item.productImage}
                    alt={item.name}
                    width={80}
                    height={80}
                    style={{ objectFit: "cover" }}
                  />
                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: "bold", marginLeft: "20px" }}>
                      {item.name}
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="column" alignItems="flex-end" justifyContent="space-between">
                  <IconButton
                    sx={{ color: "#000", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" } }}
                    onClick={() => handleRemoveFromCart(item.productId!)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography sx={{ fontSize: "14px", color: "#333" }}>
                    ₹{item.totalPrice.toLocaleString("en-IN")}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ mt: 1, border: "1px solid #ddd", borderRadius: "5px" }}
                  >
                    <IconButton
                      sx={{
                        p: "5px",
                        borderRadius: 0,
                        minWidth: "30px",
                        height: "30px",
                        borderRight: "1px solid #ddd",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                      }}
                      onClick={() => handleDecreaseQuantity(item.productId!)}
                    >
                      <RemoveIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                    <Typography sx={{ mx: 1, px: 1, borderRight: "1px solid #ddd" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      sx={{
                        p: "5px",
                        borderRadius: 0,
                        minWidth: "30px",
                        height: "30px",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                      }}
                      onClick={() => handleIncreaseQuantity(item.productId!)}
                    >
                      <AddIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold", mb: 1 }}>SUBTOTAL</Typography>
          <Typography sx={{ fontSize: "18px", mb: 1 }}>{calculateTotal()}</Typography>
          <Typography sx={{ fontSize: "12px", color: "#666", mb: 2 }}>
            Shipping, taxes, and discount codes calculated at checkout.
          </Typography>
          <Button
            onClick={() => router.push("/cartdetail")}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#000",
              color: "#fff",
              py: 1.5,
              borderRadius: "5px",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            CHECKOUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
});

ShoppingCart.displayName = "ShoppingCart";

export default ShoppingCart;
