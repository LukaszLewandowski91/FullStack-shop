import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getProducts } from '../../../redux/productsRedux';

import ProductCard from '../ProductCard/ProductCard';
const ProductsBoard = () => {
  const products = useSelector(getProducts);
  console.log(products);
  return (
    <Grid
      container
      mb={5}
      pl={3}
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {!products && <Skeleton />}
      {products.length !== 0 &&
        products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
    </Grid>
  );
};

export default ProductsBoard;
