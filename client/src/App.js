import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUserFromCookies } from './redux/usersRedux';
import MainLayout from './components/layout/MainLayout/MainLayout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromCookies(JSON.parse(localStorage.getItem('login'))));
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
