import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { getCategories } from '../../../redux/categoriesRedux';
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
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const user = useSelector((state) => getUser(state));
  const categories = useSelector(getCategories);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isCategoryOpen = Boolean(categoryAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMobileOpen((prevState) => !prevState);
  };
  const handleMobileCategoryOpen = (event) => {
    setCategoryAnchorEl(event.currentTarget);
    setMobileOpen((prevState) => !prevState);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate('/logout');
  };

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
  const categoryId = 'primary-categories-menu';
  const renderCategoriesMenu = (
    <Menu
      anchorEl={categoryAnchorEl}
      id={categoryId}
      keepMounted
      open={isCategoryOpen}
      onClose={handleCategoryClose}
    >
      {categories &&
        categories.map((category) => (
          <MenuItem onClick={handleCategoryClose}>
            {category.description}
          </MenuItem>
        ))}
    </Menu>
  );

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
        <ListItem disablePadding>
          <ListItemButton
            aria-label="account of current user"
            aria-controls={categoryId}
            aria-haspopup="true"
            sx={{ textAlign: 'center' }}
            onClick={handleMobileCategoryOpen}
          >
            Categories
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

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
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
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={9} color="primary" max={10}>
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
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
      {renderCategoriesMenu}
    </Box>
  );
};

export default MainMenu;
