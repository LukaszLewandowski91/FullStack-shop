import { Route, Routes } from 'react-router-dom';
import MainMenu from './components/layout/MainManu/MainManu';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Logout from './components/pages/Logout/Logout';

function App() {
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
