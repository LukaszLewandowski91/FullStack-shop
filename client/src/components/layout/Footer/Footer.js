import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{ marginTop: 'auto', width: '100%', height: '50px' }}
      component="footer"
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }} textAlign="center">
        Łukasz Lewandowski ShopApp
      </Typography>
    </Box>
  );
};

export default Footer;
