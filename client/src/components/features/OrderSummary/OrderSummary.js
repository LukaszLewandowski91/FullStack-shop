import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, Grid, Typography } from '@mui/material';
import { getCart } from '../../../redux/cartRedux';
const OrderSummary = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => getUser(state));
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (!user.users) {
      setAlert(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  });

  const cart = useSelector(getCart);
  return (
    <Grid container sx={{ mt: 2 }}>
      {alert && (
        <Alert severity="warning">
          <AlertTitle>Please Log In</AlertTitle>
          User not logged in — <strong>Please Log In</strong>
        </Alert>
      )}
      <Box width="100%" display="flex" justifyContent="center">
        <Typography variant="h3" fontFamily="Poppins" letterSpacing={2}>
          Order Summary
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection={{ sx: 'column', md: 'row' }}
      ></Box>
    </Grid>
  );
};

export default OrderSummary;
