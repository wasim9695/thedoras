"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import ReactImageMagnify from "react-image-magnify";
import ShoppingCart, { ShoppingCartHandle } from "../../components/shoppingcart";
import { useParams } from "next/navigation";
import { fetchProductListDetail } from "../../api/products/productsAll";

interface Category {
  _id: number;
  categoryName: string;
  image: string;
}

interface Attribute {
  _id: number;
  name: string;
  price: string;
  type: string;
}

interface Product {
  _id: number;
  categoryIds: Category[];
  name: string;
  sku: string;
  price: number;
  totalPrice: number;
  minPurchaseQty: number;
  maxPurchaseQty: number;
  otherTaxes: number;
  discount: number;
  stock: number;
  shippingDays: number;
  returnAvailability: number;
  returnDays: number;
  replacementAvailability: number;
  replacementDays: number;
  refundAvailability: number;
  cancellationAvailability: number;
  cancellationCharges: number;
  status: string;
  bestSeller: number;
  newArrival: number;
  featured: number;
  todaysDeal: number;
  festiveOffers: number;
  freeDelivery: number;
  attributes: Attribute[];
  gallaryImages: string[];
  productImage: string;
  description: string;
  discountDate: string | null;
  discountType: string;
  longDescription: string;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
  productVideoUrl: string | null;
  refundAmount: number | null;
  rating: number | null;
  reviewsCount: number | null;
}

const ProductDetailList: React.FC = () => {
  const params = useParams();
  const slug = params.slug as number[] | undefined;
  const id = slug ? slug[slug.length - 1] : undefined;
  console.log(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("Free Size");
  const [selectedColor, setSelectedColor] = useState<string>("Free Color");
  const cartRef = useRef<ShoppingCartHandle>(null);

  const fetchProductDetails = useCallback(async () => {
    if (!id) {
      setError("Product ID not found in URL");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // ✅ FIX: Pass as an object, not a string
      const response = await fetchProductListDetail(id);

      if (response?.data?.length > 0) {
        const fetchedProduct: Product = response.data[0];
        setProduct(fetchedProduct);
        setMainImage(fetchedProduct.gallaryImages?.[0] ?? fetchedProduct.productImage);
      } else {
        setError("Product not found");
        setProduct(null);
      }
    } catch (e) {
      console.error("Error fetching product:", e);
      setError("Failed to fetch product details");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleAddToCartDetail = async (product: Product) => {
    try {
      const modifiedProduct = {
        ...product,
        attri_size: selectedSize,
        attri_color: selectedColor,
      };

      if (cartRef.current) {
        cartRef.current.handleAddToCart(modifiedProduct);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Loading product details...</Typography>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ p: 4, textAlign: "center", color: "red" }}>
        <Typography>{error ?? "Product not found"}</Typography>
      </Box>
    );
  }

  const sizes = product.attributes
    .filter((attr) => attr.name.toLowerCase() === "size")
    .map((attr) => attr.type);

  const colors = product.attributes
    .filter((attr) => attr.name.toLowerCase() === "color")
    .map((attr) => attr.type);

  return (
    <>
      <Box sx={{ maxWidth: "1600px", margin: "auto", padding: "40px", display: "flex" }}>
        {/* Image Section */}
        <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {product.gallaryImages.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: mainImage === image ? "2px solid black" : "1px solid gray",
                  borderRadius: "4px",
                }}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </Box>
          <ShoppingCart ref={cartRef} />
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <ReactImageMagnify
              smallImage={{
                alt: product.name || "Product Image",
                isFluidWidth: true,
                src: mainImage,
              }}
              largeImage={{
                src: mainImage,
                width: 1200,
                height: 1600,
              }}
              enlargedImageContainerDimensions={{
                width: "150%",
                height: "150%",
              }}
            />
          </Box>
        </Box>

        {/* Details Section */}
        <Box sx={{ flex: 1, paddingLeft: "40px" }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {product.name}
          </Typography>

          <Typography sx={{ color: "gray", mb: 2 }}>{product.description}</Typography>

          {/* Colors */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {colors.length > 0 ? (
              colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "contained" : "outlined"}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    backgroundColor: selectedColor === color ? "black" : "transparent",
                    color: selectedColor === color ? "white" : "black",
                    borderColor: "black",
                    "&:hover": { backgroundColor: "black", color: "white" },
                  }}
                >
                  {color}
                </Button>
              ))
            ) : (
              <Typography>No available</Typography>
            )}
          </Box>

          {/* Price */}
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            MRP: ₹ {product.price.toFixed(2)}{" "}
            <span style={{ textDecoration: "line-through", color: "#e04a4a" }}>
              ₹ {product.price.toFixed(2)}
            </span>
          </Typography>

          {/* Sizes */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {sizes.length > 0 ? (
              sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  sx={{
                    backgroundColor: selectedSize === size ? "black" : "transparent",
                    color: selectedSize === size ? "white" : "black",
                    borderColor: "black",
                    "&:hover": { backgroundColor: "black", color: "white" },
                  }}
                >
                  {size}
                </Button>
              ))
            ) : (
              <Typography>No sizes available</Typography>
            )}
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Button
              onClick={() => handleAddToCartDetail(product)}
              variant="contained"
              sx={{
                padding: "10px 30px",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              ADD TO CART
            </Button>
            <Button
              variant="contained"
              sx={{
                padding: "10px 30px",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              BUY NOW
            </Button>
            <Button variant="outlined" sx={{ padding: "10px 30px" }}>
              ENQUIRE
            </Button>
          </Box>

          <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>{product.longDescription}</Typography>
          <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>Material: Pure Brass</Typography>
          <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>Approximate weight: 20 gm</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailList;
