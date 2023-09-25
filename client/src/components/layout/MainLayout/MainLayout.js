import Footer from '../Footer/Footer';
import MainMenu from '../MainManu/MainManu';

const MainLayout = ({ children }) => (
  <div style={{ width: '100%', margin: '0 0 5px 0' }}>
    <MainMenu />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
