import { Grid, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/productsRedux';
import { loadProductsRequest } from '../../../redux/productsRedux';
import ProductCard from '../ProductCard/ProductCard';
import { useEffect } from 'react';
const ProductsBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  const products = useSelector(getProducts);

  return (
    <Grid
      container
      mb={5}
      pl={3}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 2, md: 12 }}
    >
      {products &&
        products.map((prod) => <ProductCard key={prod.id} {...prod} />)}
    </Grid>
  );
};

export default ProductsBoard;
