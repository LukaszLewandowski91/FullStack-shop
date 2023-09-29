import { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getRequest, loadLoggedUser, LOG_IN } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => getRequest(state, LOG_IN));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(true);
    let res = await dispatch(loadLoggedUser({ email, password }));

    if (res && res.status === 201) {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };
  const handleClose = () => {
    setAlert(false);
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const formStyle = { margin: '5px auto' };
  return (
    <Grid>
      <Paper elevation={20} className={styles.paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LoginIcon />
          </Avatar>
          <h2 className={styles.headerStyle}>Sign In</h2>
          <Typography variant="caption">
            Please fill this form to create an account
          </Typography>
        </Grid>
        {request && request.success && (
          <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              <AlertTitle>Success</AlertTitle>
              You have been successfully logged in.
            </Alert>
          </Snackbar>
        )}
        {request && request.error === 401 && (
          <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              <AlertTitle>Incorrect login or password</AlertTitle>
              Please try again
            </Alert>
          </Snackbar>
        )}
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
          <Button variant="contained" type="submit" style={formStyle}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
