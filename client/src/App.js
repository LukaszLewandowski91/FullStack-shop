import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUserFromCookies } from './redux/usersRedux';
import MainLayout from './components/layout/MainLayout/MainLayout';
import { getProducts, loadProductsRequest } from './redux/productsRedux';
import { loadCategoriesRequest } from './redux/categoriesRedux';
import Home from './components/pages/Home/Home';

function App() {
  const dispatch = useDispatch();

  const products = useSelector(getProducts);

  useEffect(() => {
    dispatch(loadCategoriesRequest());
    dispatch(loadProductsRequest());
    dispatch(loadUserFromCookies(JSON.parse(localStorage.getItem('login'))));
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
