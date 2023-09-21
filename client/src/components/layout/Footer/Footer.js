import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 }} component="footer">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            textAlign="center"
          >
            Łukasz Lewandowski ShopApp
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
