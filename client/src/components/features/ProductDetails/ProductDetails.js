import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import { useState } from 'react';
import NotFound from '../../pages/NotFound/NotFound';
import {
  Box,
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { IMGS_URL } from '../../../config';
import { editCart, addToCart } from '../../../redux/cartRedux';
import { styled } from '@mui/material/styles';

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const product = useSelector((state) => getProductById(state, id));

  const [activeImage, setActiveImage] = useState(product.gallery[0].image);
  const [value, setValue] = useState(1);
  const [notes, setNotes] = useState('');

  const cart = {
    products: [],
  };

  const handleSubmit = () => {
    console.log(product);
    const local = JSON.parse(localStorage.getItem('cart'));
    if (local !== null) {
      const prodInLocal = local.products.find(
        (e) => e.productId === product.id,
      );
      if (prodInLocal) {
        prodInLocal.quantity = parseInt(prodInLocal.quantity) + parseInt(value);
        prodInLocal.notes = notes;
        dispatch(editCart(prodInLocal));
      } else {
        const productToLocal = {
          productId: product.id,
          quantity: parseInt(value),
          notes: notes,
        };
        dispatch(addToCart(productToLocal));
        local.products.push(productToLocal);
      }
      localStorage.setItem('cart', JSON.stringify(local));
    } else {
      const productToLocal = {
        productId: product.id,
        quantity: parseInt(value),
        notes: notes,
      };
      dispatch(addToCart(productToLocal));
      cart.products.push(productToLocal);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: 'black',
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    borderRadius: 0,
    height: 55,
    width: 200,
    '&:hover': {
      backgroundColor: '#D10101',
    },
  }));

  return (
    <Grid
      container
      columns={2}
      margin="5px 0 5px 0"
      sx={{ height: 500, alignItems: 'center' }}
    >
      {!product && <NotFound />}
      {product && (
        <Grid
          container
          margin="5px 0 5px 0"
          sx={{ height: 500, alignItems: 'center' }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ width: '50%' }}
            display="flex"
            justifyContent="center"
          >
            <Box component="div" display="flex">
              <ImageList
                sx={{
                  display: { xs: 'none', md: 'block' },
                  width: 100,
                  height: 300,
                }}
                cols={1}
                rowHeight={100}
              >
                {product &&
                  product.gallery.map((item) => (
                    <ImageListItem
                      key={item.id}
                      sx={{ border: '1px solid black', objectFit: 'cover' }}
                      onClick={() => setActiveImage(item.image)}
                    >
                      <img
                        alt={product.title}
                        src={`${IMGS_URL}/${item.image}`}
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            </Box>
            <Box
              component="img"
              alt={product.title}
              src={`${IMGS_URL}/${activeImage}`}
              sx={{ width: 300, height: 300 }}
            />
          </Grid>
          <Grid item xs={12} md={6} display="block" mb="20px">
            <Paper
              sx={{ width: { xs: '100%', md: '75%' }, height: '100%', p: 2 }}
              elevation={2}
            >
              <Typography
                variant="h3"
                fontFamily="Poppins"
                mb={2}
                letterSpacing={3}
              >
                {product.title}
              </Typography>
              <Typography
                fontFamily="Poppins"
                variant="h4"
                sx={{ fontWeight: 'bold' }}
                mb={2}
                letterSpacing={2}
              >
                $ {product.price}
              </Typography>
              <Typography variant="h6" fontFamily="Poppins" letterSpacing={1}>
                {product.productDescription}
              </Typography>
              <Typography variant="h6" fontFamily="Poppins" letterSpacing={1}>
                Producer:{' '}
                <Typography variant="span" color="gray">
                  {product.producer}
                </Typography>
              </Typography>
              <Typography variant="h6" fontFamily="Poppins" letterSpacing={1}>
                Category:{' '}
                <Typography variant="span" color="gray">
                  {product.category.description}
                </Typography>
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <TextField
                label="Comments for order"
                variant="outlined"
                sx={{ mb: 2, width: { xs: 200, md: 400 } }}
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
              />
              <Box display="fles" alignItems="center">
                <TextField
                  id="amount"
                  type="number"
                  value={value}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  sx={{ mr: 3 }}
                  onChange={(e) => setValue(e.target.value)}
                />

                <ColorButton onClick={handleSubmit}>Add to cart</ColorButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductDetails;
