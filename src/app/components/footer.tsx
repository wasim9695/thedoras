"use client";
import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Footer = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ padding: 2, backgroundColor: "#644c01", color: "#ffffff" }}
      >
        {/* Footer Sections */}
        <Grid item xs={3}>
          <Typography
            className="headingProduct"
            variant="h5"
            style={{
              paddingLeft: "20px",
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "#f0d993",
            }}
          >
            Social
          </Typography>
          <List>
            <ListItem component="a" href="https://www.instagram.com">
              <ListItemIcon>
                <InstagramIcon style={{ color: "#E4405F" }} />
              </ListItemIcon>
              <ListItemText primary="Instagram" />
            </ListItem>

            <ListItem component="a" href="https://www.facebook.com">
              <ListItemIcon>
                <FacebookIcon style={{ color: "#1877F2" }} />
              </ListItemIcon>
              <ListItemText primary="Facebook" />
            </ListItem>
            <ListItem component="a" href="https://www.youtube.com">
              <ListItemIcon>
                <YouTubeIcon style={{ color: "#FF0000" }} />
              </ListItemIcon>
              <ListItemText primary="YouTube" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <Typography
            className="headingProduct"
            variant="h5"
            style={{
              paddingLeft: "20px",
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "#f0d993",
            }}
          >
            About
          </Typography>
          <List>
            <ListItem component="a" href="/customer-support">
              <ListItemIcon>
                <SupportAgentIcon style={{ color: "#0072E5" }} />
              </ListItemIcon>
              <ListItemText primary="Support Center" />
            </ListItem>
            <ListItem component="a" href="/about-us">
              <ListItemIcon>
                <InfoIcon style={{ color: "#34A853" }} />
              </ListItemIcon>
              <ListItemText primary="Customer Support" />
            </ListItem>
            <ListItem component="a" href="/about-us">
              <ListItemIcon>
                <InfoIcon style={{ color: "#34A853" }} />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <Typography
            className="headingProduct"
            variant="h5"
            style={{
              paddingLeft: "20px",
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "#f0d993",
            }}
          >
            Contact
          </Typography>
          <List>
            <ListItem component="a" href="mailto:yourexample@email.com">
              <ListItemIcon>
                <EmailIcon style={{ color: "#0072E5" }} />
              </ListItemIcon>
              <ListItemText primary="yourexample@email.com" />
            </ListItem>
            <ListItem component="a" href="mailto:example@email.com">
              <ListItemIcon>
                <EmailIcon style={{ color: "#0072E5" }} />
              </ListItemIcon>
              <ListItemText primary="example@email.com" />
            </ListItem>
            <ListItem component="a" href="tel:+12545685479">
              <ListItemIcon>
                <PhoneIcon style={{ color: "#34A853" }} />
              </ListItemIcon>
              <ListItemText primary="+1 254 568-5479" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <Typography
            className="headingProduct"
            variant="h5"
            style={{
              paddingLeft: "20px",
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "#f0d993",
            }}
          >
            Customer Care
          </Typography>
          <List>
            <ListItem component="a" href="/customer-support">
              <ListItemIcon>
                <SupportAgentIcon style={{ color: "#0072E5" }} />
              </ListItemIcon>
              <ListItemText primary="FAQ & Helps" />
            </ListItem>
            <ListItem component="a" href="/about-us">
              <ListItemIcon>
                <InfoIcon style={{ color: "#34A853" }} />
              </ListItemIcon>
              <ListItemText primary="Shipping & Delivery" />
            </ListItem>
            <ListItem component="a" href="/about-us">
              <ListItemIcon>
                <InfoIcon style={{ color: "#34A853" }} />
              </ListItemIcon>
              <ListItemText primary="Return & Exchanges" />
            </ListItem>
          </List>
        </Grid>
        <Divider
          style={{
            borderColor: "#ccc",
            borderWidth: "1px",
            marginTop: "20px",
            width: "100%",
          }}
        />
        {/* Copyright */}
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{ color: "#ffffff" }}
          >
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
