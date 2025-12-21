"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import ReactImageMagnify from "react-image-magnify";
import ShoppingCart, { ShoppingCartHandle } from "../../components/shoppingcart";
import { useParams } from "next/navigation";
import { fetchProductListDetail } from "../../api/products/productsAll";
import { styled } from "@mui/material/styles";

// --- LUXURY ACCORDION STYLES ---
const StyledAccordion = styled(Box)({
  borderTop: "1px solid #d1d1d1",
  "&:last-of-type": { borderBottom: "1px solid #d1d1d1" },
});

const AccordionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 0",
  cursor: "pointer",
  "&:hover": { opacity: 0.7 },
});

const AccordionTitle = styled(Typography)({
  fontFamily: "'Playfair Display', serif", 
  fontSize: "0.85rem",
  letterSpacing: "0.15rem",
  textTransform: "uppercase",
  color: "#2d2d2d",
});

const AccordionContent = styled(Box)<{ open: boolean }>(({ open }) => ({
  maxHeight: open ? "400px" : "0",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  paddingBottom: open ? "20px" : "0",
  fontSize: "0.9rem",
  color: "#666",
  lineHeight: "1.6",
}));

// --- INTERFACES ---
interface Category { _id: number; categoryName: string; image: string; }
interface Attribute { _id: number; name: string; price: string; type: string; }
interface Product {
  _id: number; categoryIds: Category[]; name: string; sku: string; price: number;
  totalPrice: number; attributes: Attribute[]; gallaryImages: string[];
  productImage: string; description: string; longDescription: string;
}

const ProductDetailList: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string[] | undefined;
  const id = slug ? slug[slug.length - 1] : undefined;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [openSection, setOpenSection] = useState<string | null>("details"); // Default open
  
  const cartRef = useRef<ShoppingCartHandle>(null);

  const fetchProductDetails = useCallback(async () => {
    if (!id) { setError("Product ID not found"); setLoading(false); return; }
    try {
      setLoading(true);
      const response = await fetchProductListDetail(id);
      if (response?.data?.length > 0) {
        const fetchedProduct = response.data[0];
        setProduct(fetchedProduct);
        setMainImage(fetchedProduct.gallaryImages?.[0] ?? fetchedProduct.productImage);
      } else { setError("Product not found"); }
    } catch (e) { setError("Failed to fetch product details"); }
    finally { setLoading(false); }
  }, [id]);

  useEffect(() => { fetchProductDetails(); }, [fetchProductDetails]);

  const toggleSection = (section: string) => setOpenSection(openSection === section ? null : section);

  if (loading) return <Box sx={{ p: 10, textAlign: "center" }}><Typography>Loading...</Typography></Box>;
  if (error || !product) return <Box sx={{ p: 10, textAlign: "center", color: "red" }}><Typography>{error}</Typography></Box>;

  const sizes = product.attributes.filter((attr) => attr.name.toLowerCase() === "size").map((attr) => attr.type);
  const colors = product.attributes.filter((attr) => attr.name.toLowerCase() === "color").map((attr) => attr.type);

  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", padding: { xs: "20px", md: "60px 40px" } }}>
      <ShoppingCart ref={cartRef} />
      
      <Grid container spacing={6}>
        {/* Left: Image Gallery */}
        <Grid item xs={12} md={7} sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {product.gallaryImages.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image}
                onClick={() => setMainImage(image)}
                sx={{
                  width: "70px", height: "90px", objectFit: "cover", cursor: "pointer",
                  border: mainImage === image ? "1px solid black" : "1px solid #eee",
                  opacity: mainImage === image ? 1 : 0.6,
                  transition: "0.3s"
                }}
              />
            ))}
          </Box>
          <Box sx={{ flex: 1, cursor: "zoom-in" }}>
            <ReactImageMagnify
              smallImage={{ alt: product.name, isFluidWidth: true, src: mainImage }}
              largeImage={{ src: mainImage, width: 1200, height: 1600 }}
              enlargedImageContainerDimensions={{ width: "140%", height: "120%" }}
              fadeDurationInMs={300}
            />
          </Box>
        </Grid>

        {/* Right: Product Details */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", mb: 1, fontWeight: 500 }}>
            {product.name}
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 400, color: "#8b6e4b" }}>
            ₹{product.price.toLocaleString()}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Color Selection */}
          {colors.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", mb: 1 }}>Color</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {colors.map((color) => (
                  <Button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      minWidth: "80px", borderRadius: 0, border: "1px solid black",
                      backgroundColor: selectedColor === color ? "black" : "transparent",
                      color: selectedColor === color ? "white" : "black",
                      "&:hover": { backgroundColor: "black", color: "white" }
                    }}
                  >
                    {color}
                  </Button>
                ))}
              </Box>
            </Box>
          )}

          {/* Size Selection */}
          {sizes.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", mb: 1 }}>Select Size</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {sizes.map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      minWidth: "60px", borderRadius: 0, border: "1px solid black",
                      backgroundColor: selectedSize === size ? "black" : "transparent",
                      color: selectedSize === size ? "white" : "black",
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 5 }}>
            <Button
              fullWidth
              onClick={() => cartRef.current?.handleAddToCart({...product, attri_size: selectedSize, attri_color: selectedColor})}
              sx={{ py: 1.5, borderRadius: 0, backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}
            >
              ADD TO CART
            </Button>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button fullWidth variant="outlined" sx={{ py: 1.5, borderRadius: 0, borderColor: "black", color: "black" }}>
                BUY IT NOW
              </Button>
              <Button variant="outlined" sx={{ py: 1.5, borderRadius: 0, borderColor: "#ccc", color: "#666", px: 4 }}>
                ENQUIRE
              </Button>
            </Box>
          </Box>

          {/* ACCORDION SECTION - DESIGN MATCHED TO IMAGE */}
          <Box>
            {[
              { id: "details", title: "Product Details", content: product.longDescription || product.description },
              { id: "stylist", title: "Contact Our Stylist", content: "Questions about fit or styling? Chat with us on WhatsApp +91 XXXXX XXXXX." },
              { id: "delivery", title: "Delivery & Returns", content: "Handcrafted orders take 7-14 business days. We offer easy returns within 7 days of delivery." },
              { id: "disclaimer", title: "Disclaimer", content: "Natural variations in color and weave are a hallmark of handcrafted products." }
            ].map((item) => (
              <StyledAccordion key={item.id}>
                <AccordionHeader onClick={() => toggleSection(item.id)}>
                  <AccordionTitle>{item.title}</AccordionTitle>
                  <Typography sx={{ fontWeight: 300, fontSize: "1.2rem" }}>
                    {openSection === item.id ? "−" : "+"}
                  </Typography>
                </AccordionHeader>
                <AccordionContent open={openSection === item.id}>
                  {item.content}
                </AccordionContent>
              </StyledAccordion>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailList;