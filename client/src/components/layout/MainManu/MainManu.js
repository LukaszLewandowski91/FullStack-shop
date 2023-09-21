import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import CableIcon from '@mui/icons-material/Cable';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <CableIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Electronic Shop
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Sign In
          </Button>
          <Button component={Link} to="/register" color="inherit">
            Sign Up
          </Button>
          <Button component={Link} to="/logout" color="inherit">
            Sign Out
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
    // <Navbar bg="dark" data-bs-theme="dark">
    //   <Navbar.Brand>
    //     <Nav.Link as={Link} to={'/'}>
    //       Books App
    //     </Nav.Link>
    //   </Navbar.Brand>
    //   <Navbar.Toggle />
    //   <Navbar.Collapse className="justify-content-end">
    //     <Nav>
    //       <Nav.Link as={Link} to={'/'}>
    //         Home
    //       </Nav.Link>
    //       {/* {!user && ( */}
    //       <Nav.Link as={Link} to={'/login'}>
    //         Sign In
    //       </Nav.Link>
    //       {/* )} */}
    //       {/* {user && ( */}
    //       <Nav.Link as={Link} to={'/logout'}>
    //         Sign Out
    //       </Nav.Link>
    //       {/* )} */}
    //       {/* {!user && ( */}
    //       <Nav.Link as={Link} to={'/register'}>
    //         Sign Up
    //       </Nav.Link>
    //       {/* )} */}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
};

export default MainMenu;
