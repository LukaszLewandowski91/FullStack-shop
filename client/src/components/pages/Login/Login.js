import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await dispatch(loadLoggedUser({ email, password }));

    if (res && res.status === 201) {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
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
        <form className={styles.formStyle} onSubmit={handleSubmit}>
          {request && request.success && (
            <Alert variant="success">
              <Alert.Heading>Success !</Alert.Heading>
              <p>You have been successfully logged in.</p>
            </Alert>
          )}

          {request && request.error === 401 && (
            <Alert variant="danger">
              <Alert.Heading>Zly login lub haslo</Alert.Heading>
              <p>Unexpected error... Try again</p>
            </Alert>
          )}

          {request && request.pending && (
            <Alert variant="success">
              <Alert.Heading>Success !</Alert.Heading>
              <p>You have been successfully logged in.</p>
            </Alert>
          )}
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
