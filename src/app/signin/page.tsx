// pages/signin.tsx
"use client";

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';

const theme = createTheme({
  typography: {
    fontFamily: 'serif',
    h4: {
      fontWeight: 'bold',
      marginBottom: '2rem',
    },
    subtitle1: {
      fontWeight: 'bold',
      fontSize: '0.8rem',
      marginBottom: '0.5rem',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1.5rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: '#333',
          },
        },
      },
    },
  },
});

const SignIn: React.FC = () => {
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email');

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" align="center">
            LOGIN
          </Typography>

          {loginType === 'email' ? (
            // Email Login Form
            <form>
              <Typography variant="subtitle1">EMAIL</Typography>
              <TextField fullWidth variant="outlined" />

              <Typography variant="subtitle1">PASSWORD</Typography>
              <TextField fullWidth variant="outlined" type="password" />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Link href="#"   style={{ color: grey[900] }}>
                  Forgot password?
                </Link>
              </Box>

              <Button fullWidth variant="contained" size="large" sx={{ mt: 2 }}>
                SIGN IN
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  Login with{' '}
                  <Link href="#" onClick={() => setLoginType('mobile')} style={{ color: grey[900] }}>
                    Mobile Number
                  </Link>
                </Typography>
                <Link href="/register"   style={{ color: grey[900] }}>
                  Create account
                </Link>
              </Box>
            </form>
          ) : (
            // Mobile Number Login Form
            <form>
              <Typography variant="subtitle1">MOBILE NUMBER</Typography>
              <TextField fullWidth variant="outlined" />

              {/* <Typography variant="subtitle1">PASSWORD</Typography>
              <TextField fullWidth variant="outlined" type="password" /> */}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Link href="#"   style={{ color: grey[900] }}>
                  Forgot password?
                </Link>
              </Box>

              <Button fullWidth variant="contained" size="large" sx={{ mt: 2 }}>
                SIGN IN
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  Login with{' '}
                  <Link href="#"  onClick={() => setLoginType('email')} style={{ color: grey[900] }}>
                    Email
                  </Link>
                </Typography>
                <Link href="/register"  style={{ color: grey[900] }}>
                  Create account
                </Link>
              </Box>
            </form>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
