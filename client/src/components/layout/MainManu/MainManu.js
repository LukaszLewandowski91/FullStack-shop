import {
  AppBar,
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import CableIcon from '@mui/icons-material/Cable';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { getCategories } from '../../../redux/categoriesRedux';
import { addToCart, getCart } from '../../../redux/cartRedux';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const MainMenu = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => getUser(state));
  const categories = useSelector(getCategories);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    handleDrawerToggle();
    navigate('/logout');
  };

  const cart = useSelector(getCart);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('cart'));
    if (local !== null) {
      local.products.map((prod) => {
        dispatch(addToCart(prod));
      });
    }
  }, [dispatch]);

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
      <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
    </Menu>
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Electronic Shop
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            sx={{ textAlign: 'center' }}
            onClick={handleDrawerToggle}
          >
            Home
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleOpen}>
            Categories
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories &&
              categories.map((category) => (
                <ListItemButton key={category.id} sx={{ pl: 4 }}>
                  <ListItemText primary={category.description} />
                </ListItemButton>
              ))}
          </List>
        </Collapse>
        {!user.users && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/login"
              sx={{ textAlign: 'center' }}
              onClick={handleDrawerToggle}
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
              onClick={handleDrawerToggle}
            >
              Sign Up
            </ListItemButton>
          </ListItem>
        )}
        {user.users && (
          <ListItem disablePadding>
            <ListItemButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              sx={{ textAlign: 'center' }}
              onClick={handleMobileMenuOpen}
            >
              <AccountCircle /> Profile
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
            component={Link}
            to="/"
          >
            <CableIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Electronic Shop
          </Typography>
          <IconButton
            aria-label="cart"
            component={Link}
            to="/cart"
            sx={{ mr: 2 }}
          >
            <StyledBadge badgeContent={cart.length} color="primary" max={10}>
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
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
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
      {renderMenu}
    </Box>
  );
};

export default MainMenu;
