import Footer from '../Footer/Footer';
import MainMenu from '../MainManu/MainManu';

const MainLayout = ({ children }) => (
  <div style={{ width: '100%' }}>
    <MainMenu />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
