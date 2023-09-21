import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from './Register.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../redux/usersRedux';
const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const formStyle = { margin: '5px auto' };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((email, password, passwordRepeat)) {
      dispatch(registerUser({ email, password, passwordRepeat }));
    }
  };
  return (
    <Grid>
      <Paper elevation={20} className={styles.paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleIcon />
          </Avatar>
          <h2 className={styles.headerStyle}>Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account
          </Typography>
        </Grid>
        <form className={styles.formStyle} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="standard"
            label="Email"
            style={formStyle}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Password"
            type="password"
            style={formStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Confirm password"
            type="password"
            style={formStyle}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          <Button variant="contained" type="submit" style={formStyle}>
            Register
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
