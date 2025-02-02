import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField, Switch, useTheme, useMediaQuery } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useProducts } from "../components/ProductContext"; // Import the context
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ onThemeToggle }) => {
  const { logout } = useAuth();
  const { searchQuery, setSearchQuery } = useProducts();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#6a11cb", zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginLeft: '20px',
            display: "flex",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <span style={{ color: "#f39c12" }}>E</span>-Commerce
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && (
            <TextField
              label="Search Products"
              variant="outlined"
              size="small"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          <Switch
            checked={theme.palette.mode === 'dark'}
            onChange={onThemeToggle}
            color="default"
          />
          <Button
            variant="outlined"
            onClick={logout}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": { backgroundColor: "#2575fc" },
            }}
          >
            <LogoutOutlined />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
