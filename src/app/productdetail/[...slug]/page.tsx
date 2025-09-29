"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactImageMagnify from "react-image-magnify";
import ShoppingCart, { ShoppingCartHandle } from '../../components/shoppingcart';
import { useRouter, useParams } from "next/navigation";
import { fetchProductListDetail } from "../../api/products/productsAll";
import CustomOrderForm from '../../components/CustomOrderForm';


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
  const slug = params.slug as string[] | undefined;
  const id = slug ? slug[slug.length - 1] : undefined;

  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("Free Size");
  const [selectedColor, setSelectedColor] = useState<string>("Free Color");
  const cartRef = useRef<ShoppingCartHandle>(null);
  const [openSizeChart, setOpenSizeChart] = useState<boolean>(false);
  const [openLegal, setOpenLegal] = useState<boolean>(false);
  const [sideFormOpen, setSideFormOpen] = useState<boolean>(false); // State to handle side form open/close

  const fetchProductDetails = async () => {
    if (!id) {
      setError("Product ID not found in URL");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
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
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleAddToCartDetail = async (product: any) => {
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
    .filter(attr => attr.name.toLowerCase() === "size")
    .map(attr => attr.type);

  const color = product.attributes
    .filter(attr => attr.name.toLowerCase() === "color")
    .map(attr => attr.type);

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
              {...{
                smallImage: {
                  alt: product.name || "Product Image",
                  isFluidWidth: true,
                  src: mainImage,
                },
                largeImage: {
                  src: mainImage,
                  width: 1200,
                  height: 1600,
                },
                enlargedImageContainerDimensions: {
                  width: "150%",
                  height: "150%",
                },
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

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {color.length > 0 ? color.map((colors) => (
              <Button
                key={colors}
                variant={selectedColor === colors ? "contained" : "outlined"}
                onClick={() => setSelectedColor(colors)}
                sx={{
                  backgroundColor: selectedColor === colors ? "black" : "transparent",
                  color: selectedColor === colors ? "white" : "black",
                  borderColor: "black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
              >
                {colors}
              </Button>
            )) : <Typography>No available</Typography>}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            MRP: ₹ {product.price.toFixed(2)} &nbsp; <span style={{ textDecoration: "line-through", color: "#e04a4a" }}>₹ {product.price.toFixed(2)}</span>
          </Typography>

          {/* Size Selection */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {sizes.length > 0 ? sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "contained" : "outlined"}
                onClick={() => setSelectedSize(size)}
                sx={{
                  backgroundColor: selectedSize === size ? "black" : "transparent",
                  color: selectedSize === size ? "white" : "black",
                  borderColor: "black",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
              >
                {size}
              </Button>
            )) : <Typography>No sizes available</Typography>}

            <Button
              onClick={() => setSideFormOpen(true)} // Open side form on click
              sx={{
                backgroundColor: "black",
                color: "white",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              CUSTOM
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Button
              onClick={() => handleAddToCartDetail(product)}
              variant="contained"
              sx={{ padding: "10px 30px", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}
            >
              ADD TO CART
            </Button>

            <Button variant="contained" sx={{ padding: "10px 30px", backgroundColor: "black", "&:hover": { backgroundColor: "#333" } }}>
              BUY NOW
            </Button>

            <Button variant="outlined" sx={{ padding: "10px 30px" }}>
              ENQUIRE
            </Button>
          </Box>

          <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>
            {product.longDescription}
          </Typography>
          <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>Material: Pure Brass</Typography>
          <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>
            Approximate weight: 20 gm
          </Typography>

          {/* Size Chart Section */}
          <Box sx={{ mb: 3 }}>
            <Button
              fullWidth
              onClick={() => setOpenSizeChart(!openSizeChart)}
              endIcon={
                <ExpandMoreIcon
                  sx={{ transform: openSizeChart ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
                />
              }
              sx={{
                textAlign: "left",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                padding: "10px 15px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Size Chart
            </Button>
            <Collapse in={openSizeChart} timeout="auto" unmountOnExit>
              <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>SIZE</TableCell>
                      <TableCell>S</TableCell>
                      <TableCell>M</TableCell>
                      <TableCell>L</TableCell>
                      <TableCell>XL</TableCell>
                      <TableCell>XXL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      ["UK", 8, 10, 12, 14, 16],
                      ["EU", 36, 38, 40, 42, 44],
                      ["US", 6, 8, 10, 12, 14],
                      ["BUST", 34, 36, 38, 40, 42],
                      ["WAIST", 26, 28, 30, 32, 34],
                      ["HIPS", 36, 38, 40, 42, 44],
                    ].map((row, index) => (
                      <TableRow key={index}>
                        {row.map((cell, i) => (
                          <TableCell key={i}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>

            {/* Legal Section */}
            <Button
              fullWidth
              onClick={() => setOpenLegal(!openLegal)}
              endIcon={
                <ExpandMoreIcon
                  sx={{ transform: openLegal ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
                />
              }
              sx={{
                textAlign: "left",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                padding: "10px 15px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Legal
            </Button>
            <Collapse in={openLegal} timeout="auto" unmountOnExit>
              <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>SIZE</TableCell>
                      <TableCell>S</TableCell>
                      <TableCell>M</TableCell>
                      <TableCell>L</TableCell>
                      <TableCell>XL</TableCell>
                      <TableCell>XXL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      ["UK", 8, 10, 12, 14, 16],
                      ["EU", 36, 38, 40, 42, 44],
                      ["US", 6, 8, 10, 12, 14],
                      ["BUST", 34, 36, 38, 40, 42],
                      ["WAIST", 26, 28, 30, 32, 34],
                      ["HIPS", 36, 38, 40, 42, 44],
                    ].map((row, index) => (
                      <TableRow key={index}>
                        {row.map((cell, i) => (
                          <TableCell key={i}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </Box>
        </Box>
      </Box>

      {/* Side form overlay and drawer */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: sideFormOpen ? 0 : "-400px", // Slide in/out from right
          height: "100vh",
          width: "400px",
          backgroundColor: "white",
          boxShadow: "-5px 0 15px rgba(0,0,0,0.3)",
          transition: "right 0.3s ease-in-out",
          zIndex: 1300,
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {/* <Button
          onClick={() => setSideFormOpen(false)}
          sx={{
            marginBottom: 2,
            borderColor: "black",
            color: "black"
          }}
          variant="outlined"
        >
          Close
        </Button> */}

        <IconButton
                aria-label="close"
                onClick={() => setSideFormOpen(false)}
                sx={{ position: "absolute", top: 0, left: 2, zIndex:1 }}
              >
                <CloseIcon />
              </IconButton>

        {/* <Typography variant="h6" gutterBottom>
          Custom Side Form
        </Typography> */}

        {/* Add your form fields here */}
       {/* <Typography>
          This is where the custom form or content can go.
        </Typography> */}
       <CustomOrderForm/>
      </Box>

      {/* Optional overlay to close side form when clicking outside */}
      {sideFormOpen && (
        <Box
          onClick={() => setSideFormOpen(false)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1200,
          }}
        />
      )}
    </>
  );
};

export default ProductDetailList;
