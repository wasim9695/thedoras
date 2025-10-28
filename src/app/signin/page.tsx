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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";

import { signIn } from "../api/auth/login";
import { useRouter } from "next/navigation";

const theme = createTheme({
  typography: {
    fontFamily: "serif",
    h4: {
      fontWeight: "bold",
      marginBottom: "2rem",
    },
    subtitle1: {
      fontWeight: "bold",
      fontSize: "0.8rem",
      marginBottom: "0.5rem",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "1.5rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "#333",
          },
        },
      },
    },
  },
});

const SignIn: React.FC = () => {
  const router = useRouter();
  const [loginType, setLoginType] = useState<"email" | "mobile">("email");
  const [username, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await signIn({ username, password });
      if (response && response.access_token) {
        localStorage.setItem("authToken", response.access_token);
        setMessage({ type: "success", text: "Sign-in successful! Redirecting..." });
        router.push("/");
      } else {
        throw new Error("Authentication failed: No token received.");
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Sign-in failed. Please try again.";
      setMessage({ type: "error", text: errMsg });
      console.error("Sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMobileSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      // Placeholder for actual mobile login logic
      console.log("Attempting mobile sign-in with:", mobileNumber);
      setMessage({ type: "success", text: "Mobile sign-in initiated (placeholder)." });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Mobile sign-in failed. Please try again.";
      setMessage({ type: "error", text: errMsg });
      console.error("Mobile sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h4" align="center">
            LOGIN
          </Typography>

          {message && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}

          {loginType === "email" ? (
            <form onSubmit={handleEmailSignIn}>
              <Typography variant="subtitle1">EMAIL</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Typography variant="subtitle1">PASSWORD</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Link href="#" style={{ color: grey[900] }}>
                  Forgot password?
                </Link>
              </Box>

              <Button fullWidth variant="contained" size="large" sx={{ mt: 2 }} type="submit" disabled={loading}>
                {loading ? "Signing In..." : "SIGN IN"}
              </Button>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2">
                  Login with{" "}
                  <Link href="#" onClick={() => setLoginType("mobile")} style={{ color: grey[900] }}>
                    Mobile Number
                  </Link>
                </Typography>
                <Link href="/register" style={{ color: grey[900] }}>
                  Create account
                </Link>
              </Box>
            </form>
          ) : (
            <form onSubmit={handleMobileSignIn}>
              <Typography variant="subtitle1">MOBILE NUMBER</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Link href="#" style={{ color: grey[900] }}>
                  Forgot password?
                </Link>
              </Box>

              <Button fullWidth variant="contained" size="large" sx={{ mt: 2 }} type="submit" disabled={loading}>
                {loading ? "Signing In..." : "SIGN IN"}
              </Button>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2">
                  Login with{" "}
                  <Link href="#" onClick={() => setLoginType("email")} style={{ color: grey[900] }}>
                    Email
                  </Link>
                </Typography>
                <Link href="/register" style={{ color: grey[900] }}>
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
