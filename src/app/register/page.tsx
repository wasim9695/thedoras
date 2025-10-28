"use client";

import React, { useState } from "react";
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
  SelectChangeEvent,
} from "@mui/material";
import { grey, common } from "@mui/material/colors";
import { signUp } from "../api/auth/signup";
import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: { main: grey[900] },
    text: { primary: grey[900] },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h5: { fontWeight: "bold", marginBottom: "10px" },
    body1: { fontWeight: 500 },
  },
  components: {
    MuiTextField: {
      styleOverrides: { root: { marginBottom: "20px" } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: "bold",
          color: common.white,
          backgroundColor: grey[900],
          "&:hover": { backgroundColor: grey[700] },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: { root: { marginBottom: "20px", width: "100%" } },
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

// Union type for all possible event types
type FormEvent = 
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<string>;

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dob: "",
    gender: "",
    emailId: "",
    mobileNo: "",
    password: "",
    termsAndConditions: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fixed: Properly typed handleChange function
  const handleChange = (e: FormEvent): void => {
    if ('target' in e) {
      const { name, type, value, checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      setError(null);
    }
  };

  const validateForm = (): string | null => {
    if (
      !formData.fullName ||
      !formData.dob ||
      !formData.gender ||
      !formData.emailId ||
      !formData.mobileNo ||
      !formData.password ||
      !formData.termsAndConditions
    ) {
      return "All fields are required, and terms must be accepted";
    }
    if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      return "Invalid email address";
    }
    if (!/^\d{2}-\d{2}-\d{4}$/.test(formData.dob)) {
      return "Date of birth must be in DD-MM-YYYY format";
    }
    if (!/^\d{10,11}$/.test(formData.mobileNo)) {
      return "Mobile number must be 10 or 11 digits";
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.password
      )
    ) {
      return "Password must include uppercase, lowercase, number, and special character";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
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
      await signUp(formData);
      setSuccess("Registration successful! You can now log in.");
      setFormData({
        fullName: "",
        dob: "",
        gender: "",
        emailId: "",
        mobileNo: "",
        password: "",
        termsAndConditions: false,
      });
      router.push("/signin");
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h5" variant="h5">
            CREATE ACCOUNT
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2, width: "100%" }}>
              {success}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              variant="outlined"
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
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
            <Button type="submit" fullWidth variant="contained" disabled={loading}>
              {loading ? "Creating..." : "CREATE"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;