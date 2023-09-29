import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import {
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import BackspaceIcon from '@mui/icons-material/Backspace';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { editCart, removeItemCart } from '../../../redux/cartRedux';

const ProductCart = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    getProductById(state, props.productId),
  );

  const [amount, setAmount] = useState(props.quantity);
  const [notes, setNotes] = useState(props.notes);
  const countingCart = (price, amount) => {
    const subtotal = parseFloat(price) * parseInt(amount);
    return subtotal;
  };

  const cart = {
    products: [],
  };

  const increaseAmount = (value) => {
    if (value < 10) {
      value = value + 1;
      setAmount(value);
      const local = JSON.parse(localStorage.getItem('cart'));
      if (local !== null) {
        const prodInLocal = local.products.find(
          (e) => e.productId === product.id,
        );
        if (prodInLocal) {
          prodInLocal.quantity = parseInt(value);
          prodInLocal.notes = notes;
          dispatch(editCart(prodInLocal));
        }
        localStorage.setItem('cart', JSON.stringify(local));
      }
    }
  };

  const decreaseAmount = (value) => {
    if (value > 1) {
      value = value - 1;
      setAmount(value);
      const local = JSON.parse(localStorage.getItem('cart'));
      if (local !== null) {
        const prodInLocal = local.products.find(
          (e) => e.productId === product.id,
        );
        if (prodInLocal) {
          prodInLocal.quantity = parseInt(value);
          prodInLocal.notes = notes;
          dispatch(editCart(prodInLocal));
        }
        localStorage.setItem('cart', JSON.stringify(local));
      }
    }
  };

  const changeNotes = (notes) => {
    setNotes(notes);

    const local = JSON.parse(localStorage.getItem('cart'));
    if (local !== null) {
      const prodInLocal = local.products.find(
        (e) => e.productId === product.id,
      );
      if (prodInLocal) {
        prodInLocal.notes = notes;
        dispatch(editCart(prodInLocal));
      }
      localStorage.setItem('cart', JSON.stringify(local));
    }
  };

  const removeFromCart = async (itemId) => {
    await dispatch(removeItemCart(itemId));
    const local = await JSON.parse(localStorage.getItem('cart'));

    if (local.products.length > 1) {
      const prodLocal = await local.products.filter(
        (item) => item.productId !== itemId,
      );
      cart.products = prodLocal;
      dispatch(editCart(prodLocal));
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  };
  return (
    <TableRow>
      <TableCell>{product.title}</TableCell>
      <TableCell align="right">{product.price}</TableCell>
      <TableCell align="center" sx={{ alignItems: 'center' }}>
        {amount > 1 ? (
          <IconButton onClick={() => decreaseAmount(amount)}>
            <RemoveIcon />
          </IconButton>
        ) : (
          <Tooltip title="Remove product">
            <IconButton onClick={() => removeFromCart(props.productId)}>
              <HighlightOffIcon
                sx={{
                  '& :first-of-type': {
                    color: '#D10101',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        )}

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
      <TableCell
        align="right"
        sx={{ display: { xs: 'none', sm: 'table-cell' } }}
      >
        <TextField
          id="notes"
          type="text"
          value={notes}
          variant="standard"
          onChange={(e) => changeNotes(e.target.value)}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Remove product">
          <IconButton onClick={() => removeFromCart(props.productId)}>
            <BackspaceIcon
              sx={{
                '& :first-of-type': {
                  color: '#D10101',
                },
              }}
            />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
export default ProductCart;
