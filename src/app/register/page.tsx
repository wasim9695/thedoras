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
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { grey, common } from '@mui/material/colors';
import { signUp } from '../api/auth/signup'; // Adjust path based on your project structure
import { useRouter } from 'next/navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    text: {
      primary: grey[900],
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h5: {
      fontWeight: 'bold',
      marginBottom: '10px',
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '20px',
          width: '100%',
        },
      },
    },
  },
});

interface FormData {
  fullName: string;
  dob: string;
  gender: string;
  emailId: string;
  mobileNo: string;
  password: string;
  termsAndConditions: boolean;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dob: '',
    gender: '',
    emailId: '',
    mobileNo: '',
    password: '',
    termsAndConditions: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name as string]: type === 'checkbox' ? checked : value,
    });
    setError(null); // Clear error on input change
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.gender ||
      !formData.emailId ||
      !formData.mobileNo ||
      !formData.password ||
      !formData.termsAndConditions
    ) {
      return 'All fields are required, and terms must be accepted';
    }
    if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      return 'Invalid email address';
    }
    if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.dob)) {
      return 'Date of birth must be in DD-MM-YYYY format';
    }
    if (!/^\d{10,11}$/.test(formData.mobileNo)) {
      return 'Mobile number must be 10 or 11 digits';
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(formData.password)) {
      return 'Password must be at least 6 characters, including uppercase, lowercase, number, and special character';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await signUp(formData);
      setSuccess('Registration successful! You can now log in.');
      setFormData({
        fullName: '',
        dob: '',
        gender: '',
        emailId: '',
        mobileNo: '',
        password: '',
        termsAndConditions: false,
      }); // Reset form
      router.push('/signin');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2, width: '100%' }}>{success}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              fullWidth
              id="dob"
              label="Date of Birth (DD-MM-YYYY)"
              name="dob"
              autoComplete="bday"
              value={formData.dob}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
              required
            />
            <FormControl fullWidth required>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              fullWidth
              id="emailId"
              label="Email Address"
              name="emailId"
              autoComplete="email"
              value={formData.emailId}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              fullWidth
              id="mobileNo"
              label="Mobile Number"
              name="mobileNo"
              autoComplete="tel"
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAndConditions"
                  checked={formData.termsAndConditions}
                  onChange={handleChange}
                  required
                />
              }
              label="I accept the Terms and Conditions"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'CREATE'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;