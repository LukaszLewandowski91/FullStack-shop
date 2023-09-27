import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { TableRow, TableCell, TextField, IconButton } from '@mui/material';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import BackspaceIcon from '@mui/icons-material/Backspace';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { editCart, addToCart } from '../../../redux/cartRedux';
const ProductCart = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => getProductById(state, props.id));
  const [amount, setAmount] = useState(props.amount);
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
        const prodInLocal = local.products.find((e) => e.id === product.id);
        if (prodInLocal) {
          prodInLocal.amount = parseInt(value);
          prodInLocal.notes = notes;
          dispatch(editCart(prodInLocal));
        } else {
          const productToLocal = {
            id: product.id,
            amount: value,
            notes: notes,
          };
          dispatch(addToCart(productToLocal));
          local.products.push(productToLocal);
        }
        localStorage.setItem('cart', JSON.stringify(local));
      } else {
        const productToLocal = {
          id: product.id,
          amount: value,
          notes: notes,
        };
        dispatch(addToCart(productToLocal));
        cart.products.push(productToLocal);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  };

  const decreaseAmount = (value) => {
    if (value > 1) {
      value = value - 1;
      setAmount(value);
      const local = JSON.parse(localStorage.getItem('cart'));
      if (local !== null) {
        const prodInLocal = local.products.find((e) => e.id === product.id);
        if (prodInLocal) {
          prodInLocal.amount = parseInt(value);
          prodInLocal.notes = notes;
          dispatch(editCart(prodInLocal));
        } else {
          const productToLocal = {
            id: product.id,
            amount: value,
            notes: notes,
          };
          dispatch(addToCart(productToLocal));
          local.products.push(productToLocal);
        }
        localStorage.setItem('cart', JSON.stringify(local));
      } else {
        const productToLocal = {
          id: product.id,
          amount: value,
          notes: notes,
        };
        dispatch(addToCart(productToLocal));
        cart.products.push(productToLocal);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  };

  const changeNotes = (notes) => {
    setNotes(notes);
    const local = JSON.parse(localStorage.getItem('cart'));
    if (local !== null) {
      const prodInLocal = local.products.find((e) => e.id === product.id);
      if (prodInLocal) {
        prodInLocal.notes = notes;
        dispatch(editCart(prodInLocal));
      } else {
        const productToLocal = {
          id: product.id,
          amount: amount,
          notes: notes,
        };
        dispatch(addToCart(productToLocal));
        local.products.push(productToLocal);
      }
      localStorage.setItem('cart', JSON.stringify(local));
    } else {
      const productToLocal = {
        id: product.id,
        amount: amount,
        notes: notes,
      };
      dispatch(addToCart(productToLocal));
      cart.products.push(productToLocal);
      localStorage.setItem('cart', JSON.stringify(cart));
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
          <IconButton>
            <HighlightOffIcon
              sx={{
                '& :first-of-type': {
                  color: '#D10101',
                },
              }}
            />
          </IconButton>
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
      <TableCell align="right">
        <TextField
          id="notes"
          type="text"
          value={notes}
          variant="standard"
          onChange={(e) => changeNotes(e.target.value)}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton>
          <BackspaceIcon
            sx={{
              '& :first-of-type': {
                color: '#D10101',
              },
            }}
          />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default ProductCart;
