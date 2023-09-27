import { Grid, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/productsRedux';
import { loadProductsRequest } from '../../../redux/productsRedux';
import ProductCard from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
const ProductsBoard = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  return (
    <Grid
      container
      mb={5}
      pl={3}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 2, md: 12 }}
      justifyContent="center"
    >
      {loading && products.length === 0 && <CircularProgress />}
      {products &&
        products.map((prod) => <ProductCard key={prod.id} {...prod} />)}
    </Grid>
  );
};

export default ProductsBoard;
