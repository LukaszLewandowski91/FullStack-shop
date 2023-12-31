import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  Divider,
  Tooltip,
  CardContent,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IMGS_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { addToCart, editCart } from '../../../redux/cartRedux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const ProductCard = ({ ...product }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const cart = {
    products: [],
  };

  const handleSubmit = () => {
    const local = JSON.parse(localStorage.getItem('cart'));

    if (local !== null) {
      const prodInLocal = local.products.find(
        (e) => e.productId === product.id,
      );
      if (prodInLocal) {
        prodInLocal.quantity++;
        console.log(prodInLocal);
        dispatch(editCart(prodInLocal));
        setStatus(true);
      } else {
        const productToLocal = {
          productId: product.id,
          quantity: 1,
          notes: '',
        };
        dispatch(addToCart(productToLocal));
        local.products.push(productToLocal);
        setStatus(true);
      }
      localStorage.setItem('cart', JSON.stringify(local));
    } else {
      const productToLocal = {
        productId: product.id,
        quantity: 1,
        notes: '',
      };
      dispatch(addToCart(productToLocal));
      cart.products.push(productToLocal);
      localStorage.setItem('cart', JSON.stringify(cart));
      setStatus(true);
    }
  };

  const handleClose = () => {
    setStatus(false);
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={5} sx={{ width: 300 }}>
        <CardMedia
          component="img"
          alt={product.title}
          height="250"
          sx={{ objectFit: 'cover' }}
          image={`${IMGS_URL}/${product.gallery[1].image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: $ {product.price}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'right' }}>
          <Tooltip title="Add to cart">
            <IconButton aria-label="add to cart" onClick={handleSubmit}>
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Read more">
            <IconButton
              aria-label="read more"
              component={Link}
              to={`/product/${product.id}`}
            >
              <ReadMoreIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <Snackbar open={status} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Product add to cart
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProductCard;
