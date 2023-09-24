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
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IMGS_URL } from '../../../config';
const ProductCard = ({ ...product }) => {
  const cart = {
    products: [],
  };
  const handleSubmit = () => {
    const productInCart = {
      id: product.id,
      amount: 1,
      notes: '',
    };
    cart.products.push(productInCart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      sx={{ maxWidth: 300, ml: 2, boxShadow: '3px 3px 20px black' }}
    >
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          alt={product.title}
          height="200"
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
            <IconButton aria-label="read more">
              <ReadMoreIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
