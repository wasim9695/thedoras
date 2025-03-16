"use client";

import React, { useState } from "react";
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
import { useRouter } from 'next/navigation';
const ProductDetail = () => {
  const images = [
    "https://sakshigirri.com/cdn/shop/files/0N5A7016_s_1080x.jpg?v=1735279856",
    "https://sakshigirri.com/cdn/shop/files/0N5A7137_1080x.jpg?v=1735279856",
    "https://sakshigirri.com/cdn/shop/files/0N5A7137_1080x.jpg?v=1735279856",
  ];

  const [mainImage, setMainImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [openLegal, setOpenLegal] = useState(false);
  // const mainImageRef = useRef(null);
  const router = useRouter();


  const handleThumbnailClick = (image: React.SetStateAction<string>) => {
    setMainImage(image);
  };

  const handleAddToCartDetail = () => {
  
    router.push('/cartdetail'); // Navigates to the URL internally
  };

  return (
    <Box sx={{ maxWidth: "1600px", margin: "auto", padding: "40px", display: "flex" }}>
      {/* Image Section */}
      <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {images.map((image, index) => (
            <Box
              component="img"
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              sx={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </Box>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Main Product Image",
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
          PINK ACRYLIC HALTER NECK DRESS
        </Typography>
        <Typography sx={{ color: "gray", mb: 2 }}>Acrylic pink halter neck dress.</Typography>
        <Typography sx={{ color: "gray", mb: 3 }}>Color: Pink</Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          MRP: ₹ 29,000
        </Typography>

        {/* Size Selection */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {["XS", "S", "M", "L", "XL", "CUSTOM"].map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "contained" : "outlined"}
              onClick={() => setSelectedSize(size)}
              sx={{
                backgroundColor: selectedSize === size ? "black" : "transparent",
                color: selectedSize === size ? "white" : "black",
                borderColor: "black",
                '&:hover': {
                  backgroundColor: "black",
                  color: "white"
                }
              }}
            >
              {size}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button  onClick={() =>
                    handleAddToCartDetail()} variant="contained" sx={{ padding: "10px 30px", backgroundColor: "black", '&:hover': { backgroundColor: "#333" } }}>
            ADD TO CART
          </Button>
          
          <Button variant="contained" sx={{ padding: "10px 30px", backgroundColor: "black", '&:hover': { backgroundColor: "#333" } }}>
           BUY NOW
          </Button>
          <Button variant="outlined" sx={{ padding: "10px 30px" }}>
            ENQUIRE
          </Button>
        </Box>
        <Typography sx={{ color: "gray", mb: 2, mt:5 }}>
        This chic rugged black jacket with ripped detailing and black assorted delicate bead-work makes for a perfect night-out in the city! Pair with our beaded trousers for a statement co-ord.
        </Typography>
        <Typography sx={{ color: "gray", mb: 2, mt:5 }}>
        FABRIC : 100% Cotton Twill
        </Typography>
        <Typography sx={{ color: "gray", mb: 2, mt:5 }}>
        WASH & CARE : Dry Clean Only ; Do Not Iron on Embellishments ; Gentle Steaming Recommended
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            onClick={() => setOpenSizeChart(!openSizeChart)}
            endIcon={<ExpandMoreIcon sx={{ transform: openSizeChart ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />}
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
                    <TableCell>SIZE</TableCell><TableCell>S</TableCell><TableCell>M</TableCell><TableCell>L</TableCell><TableCell>XL</TableCell><TableCell>XXL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[['UK', 8, 10, 12, 14, 16], ['EU', 36, 38, 40, 42, 44], ['US', 6, 8, 10, 12, 14], ['BUST', 34, 36, 38, 40, 42], ['WAIST', 26, 28, 30, 32, 34], ['HIPS', 36, 38, 40, 42, 44]].map((row, index) => (
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

          <Button
            fullWidth
            onClick={() => setOpenLegal(!openLegal)}
            endIcon={<ExpandMoreIcon sx={{ transform: openLegal ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />}
            sx={{
              textAlign: "left",
              justifyContent: "space-between",
              backgroundColor: "#f5f5f5",
              padding: "10px 15px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            legal
          </Button>
          <Collapse in={openLegal} timeout="auto" unmountOnExit>
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SIZE</TableCell><TableCell>S</TableCell><TableCell>M</TableCell><TableCell>L</TableCell><TableCell>XL</TableCell><TableCell>XXL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[['UK', 8, 10, 12, 14, 16], ['EU', 36, 38, 40, 42, 44], ['US', 6, 8, 10, 12, 14], ['BUST', 34, 36, 38, 40, 42], ['WAIST', 26, 28, 30, 32, 34], ['HIPS', 36, 38, 40, 42, 44]].map((row, index) => (
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

export default ProductDetail;
