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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactImageMagnify from "react-image-magnify";
import ShoppingCart, { ShoppingCartHandle } from '../../components/shoppingcart';
import { useRouter, useParams } from "next/navigation";
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
  // slug might be undefined - handle properly
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

  // Fetch product detail by id
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

  const handleAddToCartDetail = async (product:any) => {
    try {
      console.log(product, selectedColor, selectedSize);

     const modifiedProduct = {
  ...product,
  attri_size: selectedSize,
  attri_color: selectedColor,
    // Replace totalPrice with 'Free'
};

console.log(modifiedProduct);

      if (cartRef.current) {
      cartRef.current.handleAddToCart(modifiedProduct);
    }

    } catch (err) {
      console.error("Error adding to cart:", err);
      // setCartMessage("Failed to add product to cart");
      // setTimeout(() => setCartMessage(null), 3000);
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
          {product.name} (User ID: {id})
        </Typography>

        <Typography sx={{ color: "gray", mb: 2 }}>{product.description}</Typography>



<Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {/* You might want to dynamically generate sizes from product attributes */}
          {/* {["XS", "S", "M", "L", "XL", "CUSTOM"].map((size) => ( */}
          {color.length > 0 ? color.map((colors, index) => (
            <Button
              key={colors}
              variant={selectedSize === colors ? "contained" : "outlined"}
              onClick={() => setSelectedColor(colors)}
              sx={{
                backgroundColor: selectedSize === colors ? "black" : "transparent",
                color: selectedSize === colors ? {colors} : {colors},
                borderColor: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
             Color: {colors}
            </Button>
         )) : <Typography>No  available</Typography>}


      
        </Box>


        {/* <Typography sx={{ color: "gray", mb: 3 }}>
  Color: {product.attributes
    .filter(attr => attr.name.toLowerCase() === "color")
    .map(attr => attr.type)
    .join(", ") || "N/A"}
</Typography> */}

{/* <Typography sx={{ color: "gray", mb: 3 }}>
  Size: {product.attributes
    .filter(attr => attr.name.toLowerCase() === "size")
    .map(attr => attr.type)
    .join(", ") || "N/A"}
</Typography> */}

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          MRP: ₹ {product.price.toFixed(2)} &nbsp; <span style={{ textDecoration: "line-through", color:"#e04a4a" }}>₹ {product.price.toFixed(2)}</span>
        </Typography>

        {/* Size Selection */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {/* You might want to dynamically generate sizes from product attributes */}
          {/* {["XS", "S", "M", "L", "XL", "CUSTOM"].map((size) => ( */}
          {sizes.length > 0 ? sizes.map((size, index) => (
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
              sx={{
                backgroundColor:  "black",
                color:"white",
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

        {/* Example additional info - replace or enhance as needed */}
        <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>
          {product.longDescription}
        </Typography>
        <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>FABRIC : 100% Cotton Twill</Typography>
        <Typography sx={{ color: "gray", mb: 2, mt: 5 }}>
          WASH & CARE : Dry Clean Only; Do Not Iron on Embellishments; Gentle Steaming Recommended
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
  );
};

export default ProductDetailList;
