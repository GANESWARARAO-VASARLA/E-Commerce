import React, { useState } from 'react';
import {
  Grid,
  Pagination,
  Container,
  TextField,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useProducts } from '../components/ProductContext';
import ProductCard from './ProductCard';

const ProductList = ({ selectedCategory }) => {
  const { products, searchQuery, setSearchQuery, loading } = useProducts();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentPageProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: { xs: '1rem', sm: '1rem' },
        marginLeft: { xs: 0, sm: '240px' },
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {isMobile && (
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        />
      )}

      {loading ? (
        <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <>
          <Grid container spacing={4}>
            {currentPageProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
          />
        </>
      )}
    </Container>
  );
};

export default ProductList;
