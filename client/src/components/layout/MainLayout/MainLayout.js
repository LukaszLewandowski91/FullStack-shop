import { Box } from '@mui/material';
import Footer from '../Footer/Footer';
import MainMenu from '../MainManu/MainManu';

const MainLayout = ({ children }) => {
  // <div
  //   style={{
  //     width: '100%',
  //     margin: '0 0 5px 0',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     minHeight: '100vh',
  //   }}
  // >
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
  {
    /* </div> */
  }
};

export default MainLayout;
