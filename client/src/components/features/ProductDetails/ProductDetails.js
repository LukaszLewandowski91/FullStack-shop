import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import { useEffect, useState } from 'react';
import NotFound from '../../pages/NotFound/NotFound';
import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from '@mui/material';
import { IMGS_URL } from '../../../config';

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) => getProductById(state, id));
  const [activeImage, setActiveImage] = useState(product.gallery[0].image);

  return (
    <Grid
      container
      columns={2}
      margin="5px 0 5px 0"
      sx={{ height: 500, alignItems: 'center' }}
    >
      {!product ? (
        <NotFound />
      ) : (
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
                sx={{ width: 100, height: 300 }}
                cols={1}
                rowHeight={100}
              >
                {product &&
                  product.gallery.map((item) => (
                    <ImageListItem
                      key={item.id}
                      sx={{ border: '1px solid black', objectFit: 'cover' }}
                    >
                      <img
                        alt={product.title}
                        src={`${IMGS_URL}/${item.image}`}
                        onClick={() => setActiveImage(item.image)}
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
          <Grid item xs={12} md={6} sx={{ height: '90%', width: '50%' }}>
            <Paper sx={{ width: '75%', height: '100%', p: 2 }} elevation={2}>
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
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductDetails;
