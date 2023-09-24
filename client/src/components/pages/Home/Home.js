import { Grid } from '@mui/material';
import MainCarousel from '../../features/MainCarousel/MainCarousel';
import ProductsBoard from '../../features/ProductsBoard/ProductsBoard';

const Home = () => {
  return (
    <Grid container rowSpacing={1}>
      <MainCarousel />
      <ProductsBoard />
    </Grid>
  );
};

export default Home;
