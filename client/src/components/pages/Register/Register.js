import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styles from './Register.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, getRequest, LOG_IN } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';
const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [confirmRegister, setConfirmRegister] = useState(false);
  const [alert, setAlert] = useState(false);
  const request = useSelector((state) => getRequest(state, LOG_IN));
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const formStyle = { margin: '5px auto' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(true);
    if ((email, password, passwordRepeat)) {
      const res = await dispatch(
        registerUser({ email, password, passwordRepeat }),
      );
      if (res && res.status === 201) {
        setConfirmRegister(true);
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
      }
    }
  };

  const handleClose = () => {
    setConfirmRegister(false);
    setAlert(false);
  };
  return (
    <Grid>
      <Snackbar
        open={confirmRegister}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          <AlertTitle>Register successfully</AlertTitle>
          Now Log In
        </Alert>
      </Snackbar>
      {alert && request.error === 409 && (
        <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            <AlertTitle>Email is already exist</AlertTitle>
            Try again
          </Alert>
        </Snackbar>
      )}
      {alert && request.error === 400 && (
        <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            <AlertTitle>Wrong password</AlertTitle>
            The password and confirm password fields must be the same
          </Alert>
        </Snackbar>
      )}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Password"
            type="password"
            style={formStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Confirm password"
            type="password"
            style={formStyle}
            value={passwordRepeat}
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
