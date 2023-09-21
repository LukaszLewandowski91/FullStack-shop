import { Route, Routes } from 'react-router-dom';
import MainMenu from './components/layout/MainManu/MainManu';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUserFromCookies } from './redux/usersRedux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromCookies(JSON.parse(localStorage.getItem('login'))));
  }, [dispatch]);

  return (
    <div className="App">
      <MainMenu />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
