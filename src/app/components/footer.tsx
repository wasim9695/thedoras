"use client";

import React from "react";
import {
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemProps,
} from "@mui/material";
import { styled } from "@mui/system";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InfoIcon from "@mui/icons-material/Info";

// Define a custom interface that extends ListItemProps with anchor props
interface StyledListItemProps extends ListItemProps {
  component?: "a"; // Specify the component type
  href?: string;
  target?: string;
  rel?: string;
}

// Type the styled component with the custom interface
const StyledListItem = styled(ListItem)<StyledListItemProps>(({ theme }) => ({
  padding: theme.spacing(1, 0),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateX(5px)",
  },
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Arial, Helvetica, sans-serif",
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: "#ffffff",
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Grid container spacing={4} justifyContent="space-between">
        {/* Social Section */}
        <Grid item xs={12} sm={6} md={3}>
          <SectionTitle variant="h6">Social</SectionTitle>
          <List>
            {[
              { icon: <InstagramIcon />, text: "Instagram", url: "https://www.instagram.com" },
              { icon: <FacebookIcon />, text: "Facebook", url: "https://www.facebook.com" },
              { icon: <YouTubeIcon />, text: "YouTube", url: "https://www.youtube.com" },
              { icon: <TwitterIcon />, text: "Twitter", url: "https://www.twitter.com" },
            ].map((item, index) => (
              <StyledListItem
                key={index}
                component="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemIcon sx={{ color: "#ffffff", minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#ffffff" }} />
              </StyledListItem>
            ))}
          </List>
        </Grid>

        {/* About Section */}
        <Grid item xs={12} sm={6} md={3}>
          <SectionTitle variant="h6">About</SectionTitle>
          <List>
            {[
              { icon: <SupportAgentIcon />, text: "Support Center", url: "/customer-support" },
              { icon: <InfoIcon />, text: "Customer Support", url: "/about-us" },
              { icon: <InfoIcon />, text: "About Us", url: "/about-us" },
            ].map((item, index) => (
              <StyledListItem
                key={index}
                component="a"
                href={item.url}
                rel="noopener noreferrer"
              >
                <ListItemIcon sx={{ color: "#ffffff", minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#ffffff" }} />
              </StyledListItem>
            ))}
          </List>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} sm={6} md={3}>
          <SectionTitle variant="h6">Contact</SectionTitle>
          <List>
            {[
              { icon: <EmailIcon />, text: "yourexample@email.com", url: "mailto:yourexample@email.com" },
              { icon: <EmailIcon />, text: "example@email.com", url: "mailto:example@email.com" },
              { icon: <PhoneIcon />, text: "+1 254 568-5479", url: "tel:+12545685479" },
            ].map((item, index) => (
              <StyledListItem
                key={index}
                component="a"
                href={item.url}
                rel="noopener noreferrer"
              >
                <ListItemIcon sx={{ color: "#ffffff", minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#ffffff" }} />
              </StyledListItem>
            ))}
          </List>
        </Grid>

        {/* Customer Care Section */}
        <Grid item xs={12} sm={6} md={3}>
          <SectionTitle variant="h6">Customer Care</SectionTitle>
          <List>
            {[
              { icon: <SupportAgentIcon />, text: "FAQ & Helps", url: "/customer-support" },
              { icon: <InfoIcon />, text: "Shipping & Delivery", url: "/about-us" },
              { icon: <InfoIcon />, text: "Return & Exchanges", url: "/about-us" },
            ].map((item, index) => (
              <StyledListItem
                key={index}
                component="a"
                href={item.url}
                rel="noopener noreferrer"
              >
                <ListItemIcon sx={{ color: "#ffffff", minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#ffffff" }} />
              </StyledListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", my: 4 }} />

      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          "& a": {
            color: "#ffffff",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          },
        }}
      >
        © {new Date().getFullYear()} Your Company. All rights reserved. |{" "}
        <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
      </Typography>
    </FooterContainer>
  );
};

export default Footer;