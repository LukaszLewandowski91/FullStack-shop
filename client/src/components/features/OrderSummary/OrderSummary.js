import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Grid,
  Typography,
  Button,
  Snackbar,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { getCart, sendOrderRequest } from '../../../redux/cartRedux';
import { styled } from '@mui/material/styles';
import { getProducts } from '../../../redux/productsRedux';
import OrderSummaryProduct from '../OrderSummaryProduct/OrderSummaryProduct';
const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => getUser(state));
  const cart = useSelector(getCart);
  const products = useSelector(getProducts);
  const [alert, setAlert] = useState(false);
  const [emptyAlert, setEmptyAlert] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [deliveryType, setDeliveryType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    if (!user.users && cart.length > 0) {
      setAlert(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else if (cart.length === 0) {
      setEmptyAlert(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  });

  const handleClose = () => {
    setAlert(false);
    setEmptyAlert(false);
    setConfirmAlert(false);
  };

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

  const totalAmount = () => {
    let amountPay = 0;

    cart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      amountPay = amountPay + item.quantity * parseFloat(product.price);
    });

    setTotalPrice(amountPay);
  };

  useEffect(() => {
    totalAmount();
  }, [cart, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let amountPay = 0;

    cart.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      amountPay = amountPay + item.quantity * parseFloat(product.price);
    });

    const orderData = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      phoneNumber: phoneNumber,
      email: email,
      deliveryType: deliveryType,
      amountProducts: cart.length,
      order: cart,
      userId: user.users.id,
      amountPay: amountPay,
    };
    console.log(orderData);
    const myOrder = await dispatch(sendOrderRequest(orderData));

    if (myOrder && myOrder.status === 201) {
      setConfirmAlert(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <Grid container sx={{ mt: 2 }}>
      {alert && cart.length > 0 && (
        <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="warning"
            sx={{ width: '100%' }}
          >
            <AlertTitle>Please Log In</AlertTitle>
            User not logged in — <strong>Please Log In</strong>
          </Alert>
        </Snackbar>
      )}
      {emptyAlert && !confirmAlert && cart.length === 0 && (
        <Snackbar
          open={emptyAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="warning"
            sx={{ width: '100%' }}
          >
            Your cart is <strong>EMPTY</strong>
          </Alert>
        </Snackbar>
      )}
      {confirmAlert && (
        <Snackbar
          open={confirmAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            <AlertTitle>Confirm</AlertTitle>
            Your order has been saved
          </Alert>
        </Snackbar>
      )}
      {!alert && !emptyAlert && cart && (
        <Box width="100%">
          <Box width="100%" display="flex" justifyContent="center">
            <Typography variant="h3" fontFamily="Poppins" letterSpacing={2}>
              Order Summary
            </Typography>
          </Box>
          <Box
            width="100%"
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            marginTop={5}
          >
            <Box
              sx={{
                width: '100vw',
                padding: 5,
                columns: { md: 2, xs: 1 },
              }}
              component="form"
            >
              <TextField
                required
                id="firstName"
                label="Firstname"
                type="text"
                sx={{ margin: 1, width: '100%' }}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                required
                id="lastName"
                label="Lastname"
                sx={{ margin: 1, width: '100%' }}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                required
                id="city"
                label="City"
                sx={{ margin: 1, width: '100%' }}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                required
                id="address"
                label="Address"
                sx={{ margin: 1, width: '100%' }}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                required
                id="phoneNumber"
                label="Phone number"
                sx={{ margin: 1, width: '100%' }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <TextField
                required
                id="email"
                label="Email"
                type="email"
                sx={{ margin: 1, width: '100%' }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControl sx={{ margin: 1, width: '100%' }}>
                <FormLabel id="deliveryType">Delivery type</FormLabel>
                <RadioGroup
                  id="deliveryType"
                  name="controlled-delivery-type"
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  required
                >
                  <FormControlLabel
                    value="post"
                    control={<Radio required />}
                    label="Post"
                  />
                  <FormControlLabel
                    value="dhl"
                    control={<Radio required />}
                    label="DHL"
                  />
                </RadioGroup>
              </FormControl>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                sx={{ margin: { xs: 2, md: 12 } }}
              >
                <ColorButton type="submit" onClick={(e) => handleSubmit(e)}>
                  Confirm order
                </ColorButton>
              </Box>
            </Box>
            <Box
              sx={{
                width: '100vw',
                background: '#EFEFEF',
                padding: 5,
                display: { xs: 'none', md: 'block', sm: 'block' },
              }}
            >
              <TextField value={'Product'} variant="standard" disabled />
              <TextField value={'Price'} variant="standard" disabled />
              <TextField value={'Quantity'} variant="standard" disabled />
              <TextField value={'Total'} variant="standard" disabled />
              {cart.map((item) => (
                <OrderSummaryProduct key={item.productId} {...item} />
              ))}
              <TextField value={''} disabled variant="standard" />
              <TextField value={''} disabled variant="standard" />
              <TextField value={'Total price:'} variant="standard" disabled />
              <TextField
                value={`$ ${totalPrice}`}
                variant="standard"
                disabled
              ></TextField>
            </Box>
            <Box
              sx={{
                width: '100vw',
                background: '#EFEFEF',
                padding: 5,
                display: { xs: 'flex', md: 'none', sm: 'none' },
                columns: { xs: 2, sm: 4, md: 4 },
                flexDirection: 'column',
              }}
            >
              <Box display="flex">
                <TextField value={'Product'} variant="standard" disabled />
                <TextField value={'Quantity'} variant="standard" disabled />
              </Box>
              <Box>
                {cart.map((item) => (
                  <OrderSummaryProduct key={item.productId} {...item} />
                ))}
              </Box>
              <Box display="flex">
                <TextField value={'Total price:'} variant="standard" disabled />
                <TextField
                  value={`$ ${totalPrice}`}
                  variant="standard"
                  disabled
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default OrderSummary;
