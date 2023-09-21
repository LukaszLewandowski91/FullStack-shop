import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import CableIcon from '@mui/icons-material/Cable';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, loadUserFromCookies } from '../../../redux/usersRedux';

const MainMenu = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useSelector((state) => getUser(state));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Electronic Shop
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" sx={{ textAlign: 'center' }}>
            Home
          </ListItemButton>
        </ListItem>
        {!user.users && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/login"
              sx={{ textAlign: 'center' }}
            >
              Sign In
            </ListItemButton>
          </ListItem>
        )}
        {!user.users && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/register"
              sx={{ textAlign: 'center' }}
            >
              Sign Up
            </ListItemButton>
          </ListItem>
        )}
        {user.users && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/logout"
              sx={{ textAlign: 'center' }}
            >
              Sign Out
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static" color="transparent" component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <CableIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Electronic Shop
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            {!user.users && (
              <Button component={Link} to="/login" color="inherit">
                Sign In
              </Button>
            )}
            {!user.users && (
              <Button component={Link} to="/register" color="inherit">
                Sign Up
              </Button>
            )}
            {user.users && (
              <Button component={Link} to="/logout" color="inherit">
                Sign Out
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default MainMenu;
