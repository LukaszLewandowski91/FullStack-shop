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
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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
            width: 500,
            height: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
            flexDirection: 'column',
          }}
        >
          <ShoppingBagOutlinedIcon sx={{ fontSize: 300, color: 'gray' }} />
          <Typography variant="h3">Your cart is empty.</Typography>
          <ColorButton sx={{ mt: 5 }} component={Link} to="/">
            return to shop
          </ColorButton>
        </Box>
      ) : (
        <Box
          sx={{
            minWidth: 800,
            height: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
          }}
        >
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{}} aria-label="cart table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Grid>
  );
};

export default ShoppingCart;
