import { useSelector } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';
import {
  Box,
  Grid,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ProductCart from '../ProductCart/ProductCart';

const ShoppingCart = () => {
  const cart = useSelector(getCart);
  console.log(cart);
  const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: 'black',
    fontFamily: 'Poppins',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderRadius: 0,
    height: 55,
    width: 200,

    '&:hover': {
      backgroundColor: '#D10101',
      textDecoration: 'none',
      color: 'white',
    },
  }));
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {cart.length === 0 ? (
        <Box
          sx={{
            width: { xs: 400, sm: 800, md: 1000 },
            height: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
            flexDirection: 'column',
          }}
        >
          <ShoppingBagOutlinedIcon
            sx={{ fontSize: { xs: 120, sm: 200, md: 300 }, color: 'gray' }}
          />
          <Typography variant="h3" sx={{ fontSize: { xs: 30 } }}>
            Your cart is empty.
          </Typography>
          <ColorButton sx={{ mt: 5 }} component={Link} to="/">
            return to shop
          </ColorButton>
        </Box>
      ) : (
        <Box
          sx={{
            width: { xs: 400, sm: 800, md: 1000 },
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <Typography variant="h3" fontFamily="Poppins" marginBottom={5}>
            Your shopping cart
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{}} aria-label="cart table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: { xs: 'none', sm: 'table-cell' },
                    }}
                  >
                    Notes
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <ProductCart key={item.id} {...item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ColorButton component={Link} to="/order" sx={{ mt: 5 }}>
            Order
          </ColorButton>
        </Box>
      )}
    </Grid>
  );
};

export default ShoppingCart;
