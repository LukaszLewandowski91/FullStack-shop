import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());
    navigate('/');
  }, [dispatch]);
};

export default Logout;
