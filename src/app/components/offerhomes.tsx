"use client";
import * as React from "react";
import { Box, Button, Container, Link, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  position: "relative", // For positioning images
  overflow: "hidden", // Prevent image overflow
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

// Styled container for the image hover effect
const ImageContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "auto",
  "& .primary-image": {
    transition: "opacity 0.3s ease-in-out", // Smooth transition for primary image
  },
  "& .secondary-image": {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0, // Hidden by default
    transition: "opacity 0.3s ease-in-out", // Smooth transition for secondary image
  },
  "&:hover .primary-image": {
    opacity: 0, // Hide primary image on hover
  },
  "&:hover .secondary-image": {
    opacity: 1, // Show secondary image on hover
  },
});

const img54 = "https://sakshigirri.com/cdn/shop/files/5_cc7f7567-7ffd-4935-ad06-5c31742ee3d5_720x.jpg"; // Primary image
const img55 = "https://sakshigirri.com/cdn/shop/files/3.3_540x.jpg"; // Secondary image (replace with your actual secondary image path)

const OfferHomes = () => {
  return (
    <Container className="thirdGried" maxWidth="xl">
      <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          border: "1px solid #dddddd",
          boxSizing: "border-box",
        }}
      >
         <Typography className='headingProduct' variant="h4" fontWeight="bold" sx={{ color: 'black' }}>
          India Price The Dora
        </Typography>
        <Typography variant="h6" sx={{ color: 'black', marginBottom: 2 }}>
          Special Discounts Available!
        </Typography>
        {/* First Stack */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          {[1, 2, 3, 4].map((item, index) => (
            <Item className="product-item" key={index}>
              <Link href="#" underline="none">
                <ImageContainer>
                  <Image
                    className="primary-image"
                    src={img54}
                    alt="Primary image"
                    width={1080}
                    height={720}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Image
                    className="secondary-image"
                    src={img55}
                    alt="Secondary image"
                    width={1080}
                    height={720}
                    style={{ width: "100%", height: "auto" }}
                  />
                </ImageContainer>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "black" }}>
                  Product Title
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575", marginBottom: 1 }}>
                  Short description of the product goes here.
                </Typography>
                <Typography variant="h6" sx={{ color: "#ff5722", fontWeight: "bold" }}>
                  $99.99
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  Buy Now
                </Button>
              </Link>
            </Item>
          ))}
        </Stack>
        {/* Second Stack */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ mt: 2 }}
        >
          {[1, 2, 3, 4].map((item, index) => (
            <Item className="product-item" key={index}>
              <Link href="#" underline="none">
                <ImageContainer>
                  <Image
                    className="primary-image"
                    src={img54}
                    alt="Primary image"
                    width={1080}
                    height={720}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Image
                    className="secondary-image"
                    src={img55}
                    alt="Secondary image"
                    width={1080}
                    height={720}
                    style={{ width: "100%", height: "auto" }}
                  />
                </ImageContainer>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "black" }}>
                  Product Title
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575", marginBottom: 1 }}>
                  Short description of the product goes here.
                </Typography>
                <Typography variant="h6" sx={{ color: "#ff5722", fontWeight: "bold" }}>
                  $99.99
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    fontWeight: "bold",
                    padding: "10px 20px",
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                >
                  Buy Now
                </Button>
              </Link>
            </Item>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export { OfferHomes };