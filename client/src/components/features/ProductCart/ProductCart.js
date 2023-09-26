import { useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { TableRow, TableCell, TextField, IconButton } from '@mui/material';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
const ProductCart = (props) => {
  const product = useSelector((state) => getProductById(state, props.id));
  const [amount, setAmount] = useState(props.amount);
  const countingCart = (price, amount) => {
    const subtotal = parseFloat(price) * parseInt(amount);
    return subtotal;
  };

  const increaseAmount = (value) => {
    if (value < 10) {
      value = value + 1;
      setAmount(value);
    }
  };
  return (
    <TableRow>
      <TableCell>{product.title}</TableCell>
      <TableCell align="right">{product.price}</TableCell>
      <TableCell align="center" sx={{ alignItems: 'center' }}>
        <IconButton>
          <RemoveIcon />
        </IconButton>
        <TextField
          id="amount"
          type="number"
          value={amount}
          InputProps={{ inputProps: { min: 1, max: 10 } }}
          sx={{
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
              {
                display: 'none',
              },
            '& :first-of-type': {
              textAlign: 'center',
            },
          }}
          onChange={(e) => setAmount(e.target.value)}
          variant="standard"
        />
        <IconButton onClick={() => increaseAmount(amount)}>
          <AddIcon />
        </IconButton>
      </TableCell>
      <TableCell align="right">{countingCart(product.price, amount)}</TableCell>
      <TableCell align="right">{props.notes}</TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
  );
};
export default ProductCart;
