import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProductProvider } from './components/ProductContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/material';

const AppContent = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lightTheme = createTheme({ palette: { mode: 'light' } });
  const darkTheme = createTheme({ palette: { mode: 'dark' } });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(savedMode);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div className="app">
        {user ? (
          <ProductProvider>
            <Navbar onThemeToggle={handleThemeToggle} />
            <Box sx={{ display: 'flex', marginTop: '64px' }}>
              {!isMobile && <Sidebar onCategorySelect={handleCategorySelect} />}
              <ProductList selectedCategory={selectedCategory} />
            </Box>
          </ProductProvider>
        ) : (
          <Login />
        )}
      </div>
    </ThemeProvider>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
