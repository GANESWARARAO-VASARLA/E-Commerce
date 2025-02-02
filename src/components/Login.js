import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

const Login = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, error,isLoading } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSeverity("error");
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleLogin = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (password.length < 6) {
      setSnackbarMessage("Password must be at least 6 characters long.");
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    try {
      if (isRegistering) {
        await registerWithEmail(name, email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (err) {
      setSnackbarMessage("An unexpected error occurred.");
      setSeverity("error");
      setOpenSnackbar(true);
    } 
  };

  const handleToggleForm = () => {
    setIsRegistering((prevState) => !prevState);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #d4d9e7,rgb(148, 186, 196))",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "start" },
                height: "100%",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "#011631",
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: { xs: "2rem", md: "4rem" },
                  textAlign: { xs: "center", md: "start" },
                }}
              >
                E-Commerce
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#011631",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  textAlign: { xs: "center", md: "start" },
                }}
              >
                Sign in to access your account and explore our amazing products.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 2,
                padding: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
              >
                {isRegistering ? "Create Account" : "Login"}
              </Typography>
              {isRegistering && (
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!/\S+@\S+\.\S+/.test(email) && email.length > 0}
                helperText={
                  !/\S+@\S+\.\S+/.test(email) && email.length > 0
                    ? "Invalid email format"
                    : ""
                }
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={password.length > 0 && password.length < 6}
                helperText={
                  password.length > 0 && password.length < 6
                    ? "Password must be at least 6 characters"
                    : ""
                }
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mb: 2,
                  py: 1.5,
                  backgroundColor: "#6a11cb",
                  "&:hover": { backgroundColor: "#2575fc" },
                }}
                onClick={handleLogin}
                disabled={isLoading} 
              >
                {isLoading ? (
                  <>
                    <CircularProgress
                      size={20}
                      sx={{ mr: 1, color: "white" }}
                    />
                    Please wait...
                  </>
                ) : isRegistering ? (
                  "Create Account"
                ) : (
                  "Login"
                )}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                  py: 1.5,
                  color: "#6a11cb",
                  borderColor: "#6a11cb",
                  "&:hover": { borderColor: "#2575fc", color: "#2575fc" },
                }}
                onClick={handleToggleForm}
              >
                {isRegistering
                  ? "Already have an account? Login"
                  : "Create a New Account"}
              </Button>
              <Typography
                variant="body2"
                sx={{ textAlign: "center", mt: 2, mb: 2 }}
              >
                OR
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  backgroundColor: "#db4437",
                  "&:hover": { backgroundColor: "#c1351d" },
                }}
                onClick={loginWithGoogle}
              >
                Sign in with Google
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
