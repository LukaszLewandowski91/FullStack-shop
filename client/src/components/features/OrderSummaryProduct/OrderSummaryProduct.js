import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';

const OrderSummaryProduct = (item) => {
  const product = useSelector((state) => getProductById(state, item.productId));
  const [total, setTotal] = useState(
    parseInt(item.quantity) * parseFloat(product.price),
  );

  return (
    <Box>
      <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}>
        <TextField value={product.title} variant="standard" disabled />
        <TextField value={`$ ${product.price}`} variant="standard" disabled />
        <TextField value={`${item.quantity}`} variant="standard" disabled />
        <TextField value={`$ ${total}`} variant="standard" disabled />
      </Box>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none', md: 'none' },
        }}
      >
        <Box>
          <TextField value={product.title} variant="standard" disabled />
        </Box>
        <Box>
          <TextField value={`${item.quantity}`} variant="standard" disabled />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSummaryProduct;
