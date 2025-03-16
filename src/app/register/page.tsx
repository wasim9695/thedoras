// pages/register.tsx
"use client";

import React, {  } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { grey, common } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900], // or any dark color you prefer
    },
    text: {
      primary: grey[900],
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h5: {
      fontWeight: 'bold',
      marginBottom: "10px",
    },
    body1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: common.white,
          backgroundColor: grey[900],
          '&:hover': {
            backgroundColor: grey[700],
          },
        },
      },
    },
  },
});

const Register: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h5" variant="h5">
            CREATE ACCOUNT
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
          />
          <TextField
            variant="outlined"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
           <TextField
            variant="outlined"
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            autoComplete="tel"
          />
          <TextField
            variant="outlined"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            CREATE
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
