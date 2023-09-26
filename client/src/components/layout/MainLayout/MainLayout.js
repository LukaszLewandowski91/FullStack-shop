import { Box } from '@mui/material';
import Footer from '../Footer/Footer';
import MainMenu from '../MainManu/MainManu';

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <MainMenu />
      {children}
      <Footer />
    </Box>
  );
};

export default MainLayout;
