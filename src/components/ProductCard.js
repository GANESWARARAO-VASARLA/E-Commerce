import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProductCard = ({ product }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const textColor = theme.palette.mode === 'dark' ? '#ffffff' : '#333333';

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Card
        onClick={openModal}
        sx={{
          maxWidth: 300,
          height: '95%',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.3)',
          },
          cursor: 'pointer',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardMedia
          component="img"
          alt={product.title}
          height="150"
          image={product.image}
          title={product.title}
          sx={{
            objectFit: 'cover',
            width: '100%',
            height: 150,
          }}
        />
        <CardContent sx={{ padding: '16px' }}>
          <Typography
            variant="h7"
            gutterBottom
            sx={{ paddingBottom: '8px', color: textColor }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingBottom: '8px', color: textColor }}
          >
            Category: {product.category}
          </Typography>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: textColor }}>
          {product.title}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} sm={5}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ height: 200, width: '80%', borderRadius: '8px' }}
                />
              )}
            </Grid>

            <Grid item xs={12} sm={7}>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: textColor }}
              >
                <strong>Category:</strong> {product.category}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: textColor }}
              >
                <strong>Description:</strong> {product.description}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                sx={{ color: textColor }}
              >
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
